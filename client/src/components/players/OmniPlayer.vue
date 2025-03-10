<template>
	<div class="player">
		<div class="in-player-notifs">
			<!-- TODO: replace with v-banner when this is fixed: https://github.com/vuetifyjs/vuetify/issues/17124 -->
			<v-sheet color="warning" density="compact" v-if="showBufferWarning">
				<v-container fluid style="padding: 6px">
					<div style="display: flex; align-items: center">
						<v-progress-circular indeterminate size="16" width="2" />
						<span>{{ $t("player.buffer-warn.spans", { ranges: renderedSpans }) }}</span>
						<v-spacer />
						<v-btn
							size="x-small"
							variant="text"
							icon
							@click="showBufferWarning = false"
						>
							<v-icon>fa:fas fa-times</v-icon>
						</v-btn>
					</div>
				</v-container>
			</v-sheet>
		</div>

		<Suspense>
			<YoutubePlayer
				v-if="!!source && source.service == 'youtube'"
				ref="player"
				:video-id="source.id"
				class="player"
				@apiready="onApiReady"
				@playing="onPlaying"
				@paused="onPaused"
				@ready="onReady"
				@buffering="onBuffering"
				@error="onError"
				@buffer-progress="onBufferProgress"
			/>
			<VimeoPlayer
				v-else-if="!!source && source.service == 'vimeo'"
				ref="player"
				:video-id="source.id"
				class="player"
				@apiready="onApiReady"
				@playing="onPlaying"
				@paused="onPaused"
				@ready="onReady"
				@buffering="onBuffering"
				@error="onError"
			/>
			<DailymotionPlayer
				v-else-if="!!source && source.service == 'dailymotion'"
				ref="player"
				:video-id="source.id"
				class="player"
				@apiready="onApiReady"
				@playing="onPlaying"
				@paused="onPaused"
				@ready="onReady"
				@buffering="onBuffering"
				@error="onError"
			/>
			<GoogleDrivePlayer
				v-else-if="!!source && source.service == 'googledrive'"
				ref="player"
				:video-id="source.id"
				class="player"
				@apiready="onApiReady"
				@playing="onPlaying"
				@paused="onPaused"
				@ready="onReady"
				@buffering="onBuffering"
				@error="onError"
			/>
			<PlyrPlayer
				v-else-if="
					!!source &&
					['direct', 'hls', 'dash', 'reddit', 'tubi', 'pluto'].includes(source.service)
				"
				ref="player"
				:service="source.service"
				:video-url="source.hls_url ?? source.id"
				:video-mime="source.mime!"
				:thumbnail="source.thumbnail"
				class="player"
				@apiready="onApiReady"
				@playing="onPlaying"
				@paused="onPaused"
				@ready="onReady"
				@buffering="onBuffering"
				@error="onError"
				@buffer-progress="onBufferProgress"
				@buffer-spans="onBufferSpans"
			/>
			<PeertubePlayer
				v-else-if="!!source && source.service == 'peertube'"
				ref="player"
				:video-id="source.id"
				class="player"
				@apiready="onApiReady"
				@playing="onPlaying"
				@paused="onPaused"
				@ready="onReady"
				@buffering="onBuffering"
				@error="onError"
			/>
			<v-container v-else fluid fill-height class="no-video">
				<h1>{{ $t("video.no-video") }}</h1>
				<span>{{ $t("video.no-video-text") }}</span>
			</v-container>
			<template #fallback>
				<v-container class="no-video">
					<v-progress-circular indeterminate />
				</v-container>
			</template>
		</Suspense>
	</div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { isInTimeRanges, secondsToTimestamp } from "@/util/timestamp";
import { PlayerStatus } from "ott-common/models/types";
import { QueueItem } from "ott-common/models/video";
import { calculateCurrentPosition } from "ott-common/timestamp";
import { defineComponent, defineAsyncComponent, PropType, ref, Ref, computed, watch } from "vue";

const services = [
	"youtube",
	"vimeo",
	"dailymotion",
	"googledrive",
	"direct",
	"reddit",
	"tubi",
	"peertube",
];

export interface MediaPlayer {
	/**
	 * Play the video.
	 *
	 * Some browsers emit promises for this, and some don't.
	 */
	play(): void | Promise<void>;
	/**
	 * Pause the video.
	 *
	 * Some browsers emit promises for this, and some don't.
	 */
	pause(): void | Promise<void>;
	setVolume(volume: number): void | Promise<void>;
	getPosition(): number | Promise<number>;
	setPosition(position: number): void | Promise<void>;

	isCaptionsSupported(): boolean;
	getAvailablePlaybackRates(): number[];
}

export interface MediaPlayerWithCaptions extends MediaPlayer {
	isCaptionsEnabled(): boolean;
	setCaptionsEnabled(enabled: boolean): void;
	getCaptionsTracks(): string[];
	setCaptionsTrack(track: string): void;
}

export interface MediaPlayerWithPlaybackRate extends MediaPlayer {
	getPlaybackRate(): Promise<number>;
	setPlaybackRate(rate: number): Promise<void>;
}

export default defineComponent({
	name: "OmniPlayer",
	props: {
		source: {
			type: Object as PropType<QueueItem | null>,
			validator: (source: QueueItem | null) => {
				return !source || services.includes(source.service);
			},
		},
	},
	emits: ["apiready", "playing", "paused", "ready", "buffering", "error"],
	components: {
		YoutubePlayer: defineAsyncComponent(() => import("./YoutubePlayer.vue")),
		VimeoPlayer: defineAsyncComponent(() => import("./VimeoPlayer.vue")),
		DailymotionPlayer: defineAsyncComponent(() => import("./DailymotionPlayer.vue")),
		GoogleDrivePlayer: defineAsyncComponent(() => import("./GoogleDrivePlayer.vue")),
		PlyrPlayer: defineAsyncComponent(() => import("./PlyrPlayer.vue")),
		PeertubePlayer: defineAsyncComponent(() => import("./PeertubePlayer.vue")),
	},
	setup(props, { emit }) {
		const store = useStore();

		const player: Ref<MediaPlayer | null> = ref(null);
		watch(player, () => {
			console.debug("Player changed", player.value);
			if (player.value) {
				player.value.setVolume(store.state.settings.volume);
			}
		});

		function checkForPlayer(p: MediaPlayer | null): p is MediaPlayer {
			if (!p) {
				console.warn(
					`There is no player available. Is the source set? ${
						props.source !== null
					} Is there a player implemented for ${props.source?.service}?`
				);
			}
			return !!p;
		}

		function implementsCaptions(p: MediaPlayer | null): p is MediaPlayerWithCaptions {
			return !!p && p.isCaptionsSupported();
		}

		function implementsPlaybackRate(p: MediaPlayer | null): p is MediaPlayerWithPlaybackRate {
			return !!p && p.getAvailablePlaybackRates().length > 0;
		}

		const isPlayerPresent = computed(() => !!player.value);

		function play(): void | Promise<void> {
			if (!checkForPlayer(player.value)) {
				return Promise.reject("Player not available yet");
			}
			return player.value.play();
		}
		function pause(): void | Promise<void> {
			if (!checkForPlayer(player.value)) {
				return Promise.reject("Player not available yet");
			}
			return player.value.pause();
		}
		function setVolume(volume: number) {
			if (!checkForPlayer(player.value)) {
				return Promise.reject("Player not available yet");
			}
			return player.value.setVolume(volume);
		}
		function getPosition() {
			if (!checkForPlayer(player.value)) {
				return 0;
			}
			return player.value.getPosition();
		}
		function setPosition(position: number) {
			if (!checkForPlayer(player.value)) {
				return;
			}
			return player.value.setPosition(position);
		}
		function isCaptionsSupported() {
			if (!checkForPlayer(player.value)) {
				return false;
			}
			if (!implementsCaptions(player.value)) {
				return false;
			}
			return player.value.isCaptionsSupported() ?? false;
		}
		function isCaptionsEnabled() {
			if (!checkForPlayer(player.value)) {
				return;
			}
			if (!implementsCaptions(player.value)) {
				return false;
			}
			return player.value.isCaptionsEnabled();
		}
		function setCaptionsEnabled(enabled: boolean) {
			if (!checkForPlayer(player.value)) {
				return;
			}
			if (!implementsCaptions(player.value)) {
				return false;
			}
			player.value.setCaptionsEnabled(enabled);
		}
		function toggleCaptions() {
			setCaptionsEnabled(!isCaptionsEnabled());
		}
		function getCaptionsTracks(): string[] {
			if (!checkForPlayer(player.value)) {
				return [];
			}
			if (!implementsCaptions(player.value)) {
				return [];
			}
			return player.value.getCaptionsTracks();
		}
		function setCaptionsTrack(track: string) {
			if (!checkForPlayer(player.value)) {
				return;
			}
			if (!implementsCaptions(player.value)) {
				return;
			}

			if (!isCaptionsEnabled()) {
				setCaptionsEnabled(true);
			}
			player.value.setCaptionsTrack(track);
		}

		function getAvailablePlaybackRates(): number[] {
			if (!checkForPlayer(player.value)) {
				return [1];
			}
			return player.value.getAvailablePlaybackRates();
		}
		function getPlaybackRate(): Promise<number> {
			if (!checkForPlayer(player.value)) {
				return Promise.resolve(1);
			}
			if (!implementsPlaybackRate(player.value)) {
				return Promise.resolve(1);
			}
			return player.value.getPlaybackRate();
		}
		function setPlaybackRate(rate: number) {
			if (!checkForPlayer(player.value)) {
				return;
			}
			if (!implementsPlaybackRate(player.value)) {
				return;
			}
			player.value.setPlaybackRate(rate);
		}
		watch(
			() => store.state.room.playbackSpeed,
			(speed: number) => {
				setPlaybackRate(speed);
			}
		);

		// player events re-emitted or data stored
		function onApiReady() {
			emit("apiready");
		}

		function onReady() {
			store.commit("PLAYBACK_STATUS", PlayerStatus.ready);
			emit("ready");
		}

		function hackReadyEdgeCase() {
			if (
				props.source &&
				(props.source.service === "youtube" || props.source.service === "dailymotion")
			) {
				store.commit("PLAYBACK_STATUS", PlayerStatus.ready);
			}
		}

		function onPlaying() {
			hackReadyEdgeCase();
			emit("playing");
		}

		function onPaused() {
			hackReadyEdgeCase();
			emit("paused");
		}

		function onBuffering() {
			store.commit("PLAYBACK_STATUS", PlayerStatus.buffering);
			emit("buffering");
		}

		function onError() {
			store.commit("PLAYBACK_STATUS", PlayerStatus.error);
			emit("error");
		}

		function onBufferProgress(percent: number) {
			store.commit("PLAYBACK_BUFFER", percent);
		}

		async function onBufferSpans(spans: TimeRanges) {
			store.commit("PLAYBACK_BUFFER_SPANS", spans);

			const position = store.state.room.isPlaying
				? calculateCurrentPosition(
						store.state.room.playbackStartTime,
						new Date(),
						store.state.room.playbackPosition,
						store.state.room.playbackSpeed
				  )
				: store.state.room.playbackPosition;
			const isInSpans = isInTimeRanges(spans, position);
			showBufferWarning.value = !isInSpans;
		}

		const showBufferWarning = ref(false);
		const renderedSpans = computed(() => {
			const spans = store.state.playerBufferSpans;
			if (!spans) {
				return [];
			}
			let result: string = "";
			for (let i = 0; i < spans.length; i++) {
				result += `${secondsToTimestamp(spans.start(i))} - ${secondsToTimestamp(
					spans.end(i)
				)}`;
				if (i < spans.length - 1) {
					result += ", ";
				}
			}
			return result;
		});

		return {
			player,

			onApiReady,
			onReady,
			onPlaying,
			onPaused,
			onBuffering,
			onError,
			onBufferProgress,
			onBufferSpans,

			isPlayerPresent,
			showBufferWarning,
			renderedSpans,
			play,
			pause,
			setVolume,
			getPosition,
			setPosition,
			isCaptionsSupported,
			isCaptionsEnabled,
			setCaptionsEnabled,
			toggleCaptions,
			getCaptionsTracks,
			setCaptionsTrack,
			getAvailablePlaybackRates,
			getPlaybackRate,
			setPlaybackRate,
		};
	},
});
</script>

<style lang="scss" scoped>
.no-video {
	display: flex;
	height: 100%;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	opacity: 60%;
	border-radius: 3px;
}

.v-theme--dark,
.v-theme--deepblue,
.v-theme--deepred {
	.no-video {
		color: #fff;
		border: 1px solid rgba(255, 255, 255, 0.5);
	}
}

.v-theme--light {
	.no-video {
		color: #000;
		border: 1px solid rgba(0, 0, 0, 0.5);
	}
}

.player {
	width: 100%;
	height: 100%;
}

.in-player-notifs {
	display: block;
	width: 100%;
	padding: 0;
	position: absolute;
	top: 0;
	left: 0;
	font-size: 12px;
	z-index: 2000;
}
</style>

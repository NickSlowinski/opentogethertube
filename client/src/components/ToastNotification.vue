<template>
	<v-sheet :color="color" class="toast" elevation="12" aria-live="polite">
		<v-icon class="toast-icon" v-if="toast.style === ToastStyle.Success">
			fa:fas fa-check
		</v-icon>
		<v-icon class="toast-icon" v-else-if="toast.style === ToastStyle.Error">
			fa:fas fa-exclamation-circle
		</v-icon>
		<span class="toast-content">
			<ProcessedText :text="toast.content" :show-add-queue-tooltip="false" />
		</span>
		<div class="bar" :style="{ 'animation-duration': `${toast.duration}ms` }"></div>
		<div class="toast-actions">
			<v-btn variant="text" v-if="undoable" @click="undo">
				{{ $t("common.undo") }}
			</v-btn>
			<v-btn variant="text" @click="close" size="x-small" icon aria-label="close">
				<v-icon>fa:fas fa-times</v-icon>
			</v-btn>
		</div>
	</v-sheet>
</template>

<script lang="ts">
import { PropType } from "vue";
import { defineComponent, ref, toRefs, onMounted, onUnmounted, Ref, computed } from "vue";
import { Toast, ToastStyle } from "@/models/toast";
import { RoomRequestType } from "ott-common/models/messages";
import { API } from "@/common-http";
import toasts from "@/util/toast";
import { useStore } from "@/store";
import ProcessedText from "./ProcessedText.vue";

const ToastNotification = defineComponent({
	name: "ToastNotification",
	props: {
		toast: {
			type: Object as PropType<Toast>,
			required: true,
		},
		number: { type: Number },
	},
	components: {
		ProcessedText,
	},
	setup(props) {
		const { toast } = toRefs(props);
		const store = useStore();
		const padding = ref(8);
		const closeTimeoutId: Ref<ReturnType<typeof setTimeout> | null> = ref(null);

		onMounted(() => {
			if (toast.value.duration) {
				closeTimeoutId.value = setTimeout(() => {
					close();
				}, toast.value.duration);
			}
		});

		onUnmounted(() => {
			if (closeTimeoutId.value) {
				clearTimeout(closeTimeoutId.value);
			}
		});

		const color = computed(() => {
			if (toast.value.style === ToastStyle.Success) {
				return "success";
			} else if (toast.value.style === ToastStyle.Error) {
				return "error";
			} else if (toast.value.style === ToastStyle.Important) {
				return "warning";
			}
			return undefined;
		});

		const undoable = computed(() => {
			if (!toast.value.event) {
				return false;
			}
			const eventType = toast.value.event.request.type;
			return (
				eventType === RoomRequestType.SeekRequest ||
				eventType === RoomRequestType.SkipRequest ||
				eventType === RoomRequestType.AddRequest ||
				eventType === RoomRequestType.RemoveRequest
			);
		});

		async function undo() {
			try {
				await API.post(`/room/${store.state.room.name}/undo`, {
					data: { event: toast.value.event },
				});
				close();
			} catch (err) {
				toasts.add({
					style: ToastStyle.Error,
					content: err.message,
					duration: 4000,
				});
			}
		}

		function close() {
			toasts.remove(toast.value.id);
		}

		return {
			padding,
			color,
			undoable,

			undo,
			close,
			ToastStyle,
		};
	},
});

export default ToastNotification;
</script>

<style lang="scss" scoped>
$toast-height: 48px; // $snackbar-wrapper-min-height;
$toast-height-multiline: 68px; // vuetify.$snackbar-multi-line-wrapper-min-height;
$toast-min-width: 344px; // $snackbar-wrapper-min-width;
$toast-max-width: 672px; // $snackbar-wrapper-max-width;
$toast-margin: 8px; // vuetify.$snackbar-wrapper-margin;
$toast-padding: 0; // vuetify.$snackbar-wrapper-padding;
$toast-content-padding: 14px 16px;

@keyframes toast_timer {
	0% {
		// transform: scaleX(1);
		width: 100%;
	}
	100% {
		// transform: scaleX(0);
		width: 0;
	}
}

.toast {
	position: relative;
	display: inline-flex;
	min-height: $toast-height;
	margin: $toast-margin;
	padding: $toast-padding;
	min-width: $toast-min-width;
	max-width: $toast-max-width;
	align-items: center;
	border-radius: 4px;

	.toast-icon {
		margin-left: 10px;
	}

	.toast-content {
		padding: $toast-content-padding;
	}

	.toast-actions {
		display: flex;
		align-items: center;
		margin-left: auto;
	}

	.bar {
		display: block;
		position: absolute;
		width: 100%;
		background: white;
		height: 4px;
		right: 0;
		bottom: 0;

		animation-name: toast_timer;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}
}
</style>

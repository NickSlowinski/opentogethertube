import { OttWebsocketError, Role } from "ott-common/models/types";

export default {
	"common": {
		"cancel": "Отмена",
		"close": "Закрыть",
		"close-all": "Закрыть всё",
		"add": "Добавить",
		"play": "играть",
		"pause": "Пауза",
		"save": "Сохранить",
		"search": "Поиск",
		"undo": "Отменить действие",
	},
	"landing": {
		hero: {
			title: "Насладитесь совместным просмотром.",
			description:
				"Синхронизированный просмотр в реальном времени. Выборочная система голосования.\nТёмная тема. Регистрация не требуется. Открытый исходный код.\nНикогда ещё не было так легко смотреть видео вместе.",
			btns: {
				create: "@:nav.create.title",
				browse: "Просмотр комнат",
				source: "Исходный код",
			},
		},
		intro: {
			title: "Удалённый просмотр с друзьями теперь стал намного проще",
			name: "OpenTogetherTube",
			text1: " - платформа для синхронизированного просмотра видео в реальном времени.\nОна проста в использовании и не требует регистрации. Просто создайте комнату, добавьте видео и\nпригласите Ваших друзей. БУМ! Вы готовы смотреть видео со своими друзьями до 3 часов ночи.",
			text2: "Оригинальный TogetherTube был любим за его простой интерфейс,\nи за то, как легко было сразу начать просмотр.\nOpenTogetherTube стремится быть таким же простым, продолжая совершенствоваться.",
			text3: "На данный момент Вы можете смотреть онлайн видео со своими друзьями с Youtube, Vimeo, Dailymotion, с прямых ссылок на видео в формате .mp4, и в ближайшее время их будет",
			link: "ещё больше.",
		},
		features: {
			"title": "Основные функции",
			"synchronized-playback": {
				title: "Синхронное воспроизведение",
				text: "Нажмите одну кнопку, и видео воспроизведётся для всех\nв комнате. Проще простого.",
			},
			"permanent-rooms": {
				title: "Постоянные комнаты",
				text: "Ваша компания друзей часто возвращается сюда? Избегите хлопот\nс отправкой новой ссылки каждый раз. Постоянные\nкомнаты получают персональный URL-адрес.",
			},
			"dark-theme": {
				title: "Тёмная тема",
				text: "Смотрите нарезки из Vine поздно ночью?\nOpenTogetherTube имеет тёмную тему,\nтак что Ваши глаза не будут испытывать дискомфорт.",
			},
			"room-permissions": {
				title: "Настройка прав",
				text: "Устали от случайных придурков, заходящих в Вашу комнату и\nдобавляющих кучу громких видео к Вашему сеансу\n прослушивания Lofi Hip-Hop? Просто запретите им добавлять видео.",
			},
			"voting-system": {
				title: "Система голосования",
				text: "Не можете решить, что будете смотреть дальше? Добавьте в Вашу очередь воспроизведения\nсистему голосования, и да здравствует демократия!",
			},
			"playlist-copying": {
				title: "Копирование плейлиста",
				text: "Добавляйте целые плейлисты или каналы\nв очередь, чтобы вам не пришлось\nдобавлять каждый файл по отдельности. Это лучший\nспособ просмотра группы видео с Вашими друзьями!",
			},
		},
		support: {
			title: "Поддержать разработку",
			description1:
				"OpenTogetherTube не существовал бы без поддержки таких прекрасных людей, как Вы.",
			description2:
				"Погрузитесь в разработку, поделившись вашим кодом или идеями, или выразите поддержку, став спонсором. Все пожервтования идут на оплату хостинга, на разработку OpenTogetherTube, и свободу OpenTogetherTube от рекламных баннеров.",
			how: "Как Я могу помочь?",
			sponsor: "Стать спонсором",
			contribute: "Посодействовать",
		},
	},
	"footer": {
		"disclaimer": "Дисклеймер: OpenTogetherTube никак не связан с TogetherTube и Watch2Gether.",
		"made-in": "Сделано в Америке",
		"thanks-to": "Особая благодарность",
		"privacy-policy": "Политика конфиденциальности",
		"attribution": "Авторство",
	},
	"not-found": {
		title: "Страница не найдена",
		home: "@:nav.home",
		browse: "@:landing.hero.btns.browse",
	},
	"quick-room": {
		text: "Создаём временную комнату для Вас...",
	},
	"attribution": {
		"sponsorblock-text": "Используются данные SponsorBlock:",
	},
	"nav": {
		"home": "Главная",
		"browse": "Комнаты",
		"faq": "FAQ",
		"bug": "Сообщить о баге",
		"support": "Поддержать",
		"login": "Вход",
		"link-discord": "Ссылка на Discord",
		"logout": "Выход",
		"create": {
			"title": "Создать комнату",
			"temp": "Создать временную комнату",
			"temp-desc": "Начните просмотр как можно скорее",
			"perm": "Создать постоянную комнату",
			"perm-desc": "Отлично подходит для частых посетителей",
		},
	},
	"room-list": {
		"no-rooms": "На данный момент нет ни одной комнаты...",
		"create": "@:nav.create.title",
		"no-description": "Нет описания.",
		"nothing-playing": "Ничего не воспроизводится.",
	},
	"room": {
		"title-temp": "Временная комната",
		"kick-me": "Кикнуть",
		"rewind": "Назад на 10с",
		"skip": "Вперёд на 10с",
		"play-pause": "Воспроизведение/Пауза",
		"next-video": "Следующее видео",
		"toggle-fullscreen": "Полноэкранный режим",
		"con-status": {
			connecting: "Подключение...",
			connected: "Подключено",
		},
		"tabs": {
			queue: "Очередь",
			settings: "Настройки",
		},
		"users": {
			title: "Пользователи",
			set: "Выберите себе ник",
			empty: "Кажется, здесь никого нет. Пригласите своих друзей!",
			you: "Вы",
			demote: "Понизить",
			promote: "Повысить",
		},
	},
	"privacy": {
		title: "@:footer.privacy-policy",
		text1: "Этот сайт использует Cookies. Также сайт использует Google Analytics, но отслеживается лишь малая часть информации. Единственный вид собираемой демографической информации - страна проживания, используете ли Вы настольное или мобильное устройство. Собираемая информация никогда не будет связана с Вашим OTT аккаунтом или сессией. Если Вы не хотите чтобы информация собиралась, используйте AdBlock.",
		text2: "Ваш IP не зарегистрирован в логах OpenTogetherTube. IP записывается на короткий промежуток времени.\nЧаты не записываются. Любые видео, которые вы ищете, никогда не будут связаны с Вашим аккаунтом или сессией.",
		text3: "Обычное использование сайта, как создание комнаты, добавление видео, и т.д., регистрируется для мониторинга и логов. Логи не оставляются больше чем на неделю.\nСобытия в логах никак не связаны с Вашим аккаунтом или сессией.",
		text4: "Если у вас есть зарегистрированный аккаунт, Ваш E-mail используется только для восстановления доступа к аккаунту, или для связи с Вами, если это необходимо. E-mail не требуется, если вы авторизуетесь через Discord. Ваш E-mail, Ваши комнаты, и другая Ваша информация - приватна, и никогда не будет предоставлена третьим лицам.",
		text5: {
			"text": "OpenTogetherTube использует GDPR. Если по какой-то причине вам нужна информация о Вашем аккаунте, свяжитесь со мной в",
			"link-text": "Twitter.",
		},
		text6: {
			"text1": "Сайт использует Youtube Data API, и его использование соответствует",
			"link-text1": "Условиям обслуживания YouTube API",
			"text2":
				"Никакая персональная информация не отправляется в YouTube. Просмотр видео с YouTube требует от Вас согласия с",
			"link-text2": "Условиями обслуживания Youtube",
			"text3": "и",
			"link-text3": "политикой конфиденциальности Google",
		},
	},
	"chat": {
		"title": "Чат",
		"type-here": "Напишите Ваше сообщение здесь...",
	},
	"share-invite": {
		title: "Приглашение",
		text: "Скопируйте эту ссылку, и поделитесь ею с друзьями!",
		copied: "Скопировано!",
	},
	"video": {
		"add-explanation": "Добавить в очередь.",
		"playnow": "Воспроизвести сейчас",
		"playnow-explanation":
			"Воспроизвести это видео сейчас, переместив текущее видео вверх очереди.",
		"no-video": "Ничего не проигрывается.",
		"no-video-text": "Добавьте Ваше видео.",
	},
	"add-preview": {
		"add-all": "Добавить всё",
		"placeholder":
			"Воспользуйтесь поиском на YouTube здесь, или вставьте URL видео, чтобы добавить его в очередь",
		"title": "Что я могу добавить?",
		"single-videos": "Видео",
		"playlists": "Плейлисты",
		"playlist": "Плейлист",
		"text": "Или просто введите текст для поиска на Youtube",
		"search-for": 'Найдите на YouTube "{search}", нажав Enter или кнопку Поиск.',
		"platforms": {
			"youtube-videos": "YouTube видео: {url}",
			"vimeo-videos": "Vimeo видео: {url}",
			"dailymotion-videos": "Dailymotion видео: {url}",
			"any-mp4-videos": "Общедоступные .mp4 видео: {url}",
			"youtube-playlists": "YouTube плейлисты: {url}",
			"youtube-channels": "YouTube каналы: {url}",
			"subreddits": "Сабреддиты: {url}",
		},
		"messages": {
			"unknown-status": "Неизвестный статус добавления превью: {status}.",
			"unknown-error":
				"Произошла неизвестная ошибка при получении превью видео. Попробуйте позже.",
			"failed-to-get-add-preview":
				"Не удалось получить превью для видео. Вероятно, это ошибка, подробности в консоли.",
			"failed-to-all-videos": "Ошибка для всех видео: {message}",
		},
	},
	"processed-text": {
		"link-hint": "Нажмите, чтобы скопировать эту ссылку во вкладку добавления",
	},
	"video-queue": {
		"no-videos": "Очередь пуста.",
		"add-video": "Добавить видео",
	},
	"video-queue-item": {
		"experimental": "Эта функция в стадии тестирования... Может сломаться!",
		"play-next": "Следующее",
		"play-last": "Предыдущее",
		"messages": {
			"video-added": "Видео добавлено",
			"video-removed": "Видео удалено",
		},
		"start-at": "Воспроизведено на {timestamp}",
	},
	"room-settings": {
		"title": "@:create-room-form.title",
		"description": "@:create-room-form.description",
		"visibility": "@:create-room-form.visibility",
		"public": "@:create-room-form.public",
		"unlisted": "@:create-room-form.unlisted",
		"queue-mode": "@:create-room-form.queue-mode",
		"manual": "@:create-room-form.manual",
		"manual-hint":
			"Режим по умолчанию. Вы можете вручную изменить порядок элементов в очереди.",
		"vote": "@:create-room-form.vote",
		"vote-hint": "Следующим воспроизводится видео с наибольшим количеством голосов.",
		"loop": "Повтор",
		"loop-hint": "Когда видео закончится, переместить его в конец очереди.",
		"dj": "DJ",
		"dj-hint":
			"Когда видео закончится, начать его просмотр с самого начала. Подходит для зацикливания фоновой музыки.",
		"auto-skip-text":
			"Автоматический пропуск спонсируемых сегментов, заставок, саморекламы с использованием данных SponsorBlock.",
		"permissions-not-available": "Настройки разрешений недоступны во временных комнатах.",
		"room-needs-owner":
			"Этой комнате нужен владелец, прежде чем можно будет изменить разрешения.",
		"login-to-claim": "Авторизуйтесь, чтобы стать владельцем этой комнаты.",
		"arent-able-to-modify-permissions": "Вы не можете изменять разрешения в этой комнате.",
		"settings-applied": "Настройки применены",
		"now-own-the-room": "Теперь комната {room} принадлежит Вам.",
	},
	"create-room-form": {
		"card-title": "Создать постоянную комнату",
		"create-room": "Создать комнату",
		"name": "Имя комнаты",
		"name-hint": "Используется как URL комнаты. Не может быть изменено позже.",
		"title": "Заголовок",
		"title-hint": "Необязательно",
		"description": "Описание",
		"description-hint": "@:create-room-form.title-hint",
		"visibility": "Видимость",
		"visibility-hint": "Определяет, отображается ли комната в списке комнат или нет.",
		"queue-mode": "Режим очереди",
		"manual": "Вручную",
		"vote": "Голосование",
		"public": "Публичная",
		"unlisted": "Скрытая",
		"rules": {
			"name": {
				"name-required": "Имя обязательно",
				"no-spaces": "Имя не должно содержать пробелов.",
				"length": "Имя должно содержать от 3 до 32 символов",
				"alphanumeric":
					"Имя должно содержать только латинские буквы, цифры, тире и подчеркивания",
				"taken": "Имя занято",
			},
			"invalid-visibility": "Недопустимая видимость",
			"invalid-queue": "Недопустимый режим очереди",
		},
		"unknown-error": "Произошла неизвестная ошибка. Попробуйте позже.",
	},
	"login-form": {
		"login": "@:nav.login",
		"register": "Регистрация",
		"login-discord": "Войти через Discord",
		"email": "E-mail",
		"username": "Имя пользователя",
		"password": "Пароль",
		"retype-password": "Повторите пароль",
		"rules": {
			"email-required": "Обязательное поле",
			"valid-email": "E-mail должен быть настоящим!",
			"username-required": "Обязательное поле",
			"username-length": "Имя пользователя должно содержать от 1 до {length} символов",
			"password-required": "Обязательное поле",
			"password-length": "Длина пароля должна составлять не менее 10 символов",
			"retype-password": "Повторно введите свой пароль",
			"passwords-match": "Пароли должны совпадать",
		},
		"errors": {
			"something-weird-happened":
				"Произошло что-то странное, но, возможно, Вы вошли в систему? Обновите страницу.",
			"login-failed-noserver":
				"Не удалось войти в систему, но сервер не сказал почему. Сообщите об этой ошибке на GitHub.",
			"login-failed":
				"Не удалось войти в систему по неизвестной причине. Сообщите об этой ошибке на GitHub.",
			"register-failed-noserver":
				"Не удалось зарегистрироваться, но сервер не сказал почему. Сообщите об этой ошибке на GitHub.",
			"register-failed":
				"Не удалось зарегистрироваться по неизвестной причине. Проверьте консоль и сообщите об этой ошибке на GitHub.",
			"in-use": "Уже используется.",
		},
	},
	"permissions-editor": {
		"title": "Настройка разрешений",
		"text1":
			"Все разрешения, предоставленные менее привилегированным пользователям, автоматически предоставляются более привилегированным пользователям.",
		"text2":
			"Администраторам предоставляется всё. Владелец комнаты автоматически становится администратором и не может быть понижен в должности.",
		"viewing-as": "Просмотреть как",
		"permission": "Разрешение",
	},
	"client-settings": {
		title: "Персональные настройки",
		description: "Эти настройки сохраняются в Вашем браузере и влияют только на Вас.",
		activator: "@:client-settings.title",
	},
	"connect-overlay": {
		"title": "Отключено",
		"find-another": "Найдите другую комнату",
		"dc-reasons": {
			[OttWebsocketError.ROOM_NOT_FOUND]: "Комната не найдена.",
			[OttWebsocketError.ROOM_UNLOADED]: "Комната выгружена.",
			[OttWebsocketError.MISSING_TOKEN]:
				"Токен не был предоставлен. Обновите страницу и попробуйте ещё раз. В противном случае, пожалуйста, сообщите об этой ошибке на GitHub.",
			unknown: "Неизвестная ошибка. Пожалуйста, сообщите об этой ошибке на GitHub.",
		},
	},
};

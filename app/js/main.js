function initDatepicker() {
	const groups = [
		{
			input: document.querySelector('.header-group:first-child .header-datepicker-input'),
			toggle: document.querySelector('.header-group:first-child .header-datepicker-toggle'),
			reset: document.querySelector('.header-group:first-child .header-datepicker-reset'),
			type: 'from'
		},
		{
			input: document.querySelector('.header-group:last-child .header-datepicker-input'),
			toggle: document.querySelector('.header-group:last-child .header-datepicker-toggle'),
			reset: document.querySelector('.header-group:last-child .header-datepicker-reset'),
			type: 'to'
		}
	];

	if (!groups[0].input || !groups[1].input) {
		return;
	}

	const pickers = [];

	flatpickr.localize({
		weekdays: {
			shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		}
	});

	groups.forEach((group, index) => {
		const config = {
			dateFormat: 'd_m_Y',
			allowInput: false,
			clickOpens: false,
			disableMobile: true,
			onChange: function (selectedDates) {
				if (selectedDates.length === 0) return;

				const otherIndex = index === 0 ? 1 : 0;
				const otherPicker = pickers[otherIndex];

				if (otherPicker) {
					if (group.type === 'from') {
						otherPicker.set('minDate', selectedDates[0]);
					} else {
						otherPicker.set('maxDate', selectedDates[0]);
					}
				}
			}
		};

		if (group.type === 'to') {
			config.maxDate = new Date();
		}

		const picker = flatpickr(group.input, config);
		pickers.push(picker);

		// Функція перемикання календаря
		const toggleCalendar = (e) => {
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			picker.isOpen ? picker.close() : picker.open();
		};

		if (group.toggle) {
			group.toggle.addEventListener('click', toggleCalendar);
			group.toggle.addEventListener('touchend', toggleCalendar);
		}

		if (group.input) {
			group.input.addEventListener('click', toggleCalendar);
			group.input.addEventListener('touchend', toggleCalendar);
		}

		if (group.reset) {
			const handleReset = (e) => {
				if (e) {
					e.preventDefault();
					e.stopPropagation();
				}
				picker.clear();

				const otherPicker = pickers[index === 0 ? 1 : 0];
				if (otherPicker) {
					if (group.type === 'from') {
						otherPicker.set('minDate', null);
					} else {
						otherPicker.set('maxDate', null);
					}
				}
			};
			group.reset.addEventListener('click', handleReset);
			group.reset.addEventListener('touchend', handleReset);
		}
	});
}

// Ініціалізація при завантаженні DOM та перевірка наявності Flatpickr
if (typeof flatpickr !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initDatepicker);
	} else {
		initDatepicker();
	}
}

function initViewToggle() {
	const gridButton = document.getElementById('postGrid');
	const listButton = document.getElementById('postList');
	const postsList = document.querySelector('.posts-list');

	if (!gridButton || !listButton || !postsList) {
		return;
	}

	function switchToGrid() {
		gridButton.classList.add('is-active');
		listButton.classList.remove('is-active');
		postsList.classList.remove('is-list');
	}

	function switchToList() {
		listButton.classList.add('is-active');
		gridButton.classList.remove('is-active');
		postsList.classList.add('is-list');
	}

	gridButton.addEventListener('click', () => {
		if (!gridButton.classList.contains('is-active')) {
			switchToGrid();
		}
	});

	listButton.addEventListener('click', () => {
		if (!listButton.classList.contains('is-active')) {
			switchToList();
		}
	});
}

initViewToggle();




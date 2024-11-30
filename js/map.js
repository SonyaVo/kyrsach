
// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

// Масштабирование и перемещение карты
const map = document.querySelector('.map');
const mapImage = document.getElementById('mapImage');
let isDragging = false;
let startX, startY, mapX = 0, mapY = 0;
let scale = 1;

// Установка начального размера карты
window.onload = () => {
    const container = document.querySelector('.map-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    mapImage.style.width = `${containerWidth}px`;
    mapImage.style.height = `${containerHeight}px`;
};

const mapContainer = document.querySelector('.map-container');

// Отключаем контекстное меню
// Отключаем контекстное меню
mapContainer.addEventListener('contextmenu', (e) => e.preventDefault());

// Обработка начала перетаскивания правой кнопкой мыши
mapContainer.addEventListener('mousedown', (e) => {
    if (e.button === 2) { // Проверяем, что нажата правая кнопка
        isDragging = true;
        startX = e.clientX - mapX;
        startY = e.clientY - mapY;
        map.style.cursor = 'grabbing'; // Изменяем курсор при перетаскивании
    }
});

// Обработка движения мыши
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        mapX = e.clientX - startX;
        mapY = e.clientY - startY;
        map.style.transform = `translate(${mapX}px, ${mapY}px) scale(${scale})`;
    }
});

// Завершение перетаскивания
document.addEventListener('mouseup', () => {
    isDragging = false;
    map.style.cursor = 'grab'; // Возвращаем курсор
});

// Масштабирование карты
mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;

    scale = Math.min(Math.max(scale + delta, 0.05), 10); // Ограничение масштаба (от 0.05 до 10)
    map.style.transform = `translate(${mapX}px, ${mapY}px) scale(${scale})`;
});








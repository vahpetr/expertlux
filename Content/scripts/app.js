ymaps.ready(function() {
    var place = [58.00735, 56.245424];
    var map = new ymaps.Map('map', {
        center: place,
        zoom: 16,
        behaviors: [],
        controls: []
    });
    map.controls.add('zoomControl');

    var expertluxPlace = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: place
        },
        properties: {
            iconContent: 'Эксперт люкс',
            hintContent: 'Пушкина 27, Регистрация ООО, ИП, НКО под ключ'
        }
    }, {
            preset: 'islands#darkgreenStretchyIcon'
        });        
    map.geoObjects.add(expertluxPlace);
});
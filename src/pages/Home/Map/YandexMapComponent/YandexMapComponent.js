import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, Rectangle } from '@pbe/react-yandex-maps';
import { YandexMapMenuComponent } from '../YandexMapMenuComponent/YandexMapMenuComponent';
import { menuContent } from '../YandexMapMenuComponent/menuContent';
import { mapPoints } from './markers';
import styles from './YandexMapComponent.module.scss';

export const YandexMapComponent = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [features, setFeatures] = useState([]);
  const [objects, setObjects] = useState([]);
  const [currentZoom, setCurrentZoom] = useState(13);
  const mapRef = useRef(null);

  const centerMap = [59.80770292, 30.08451200];
  const zoomMap = 13;
  const minZoom = 10;
  const maxZoom = 18;

  useEffect(() => {
    const initialFeatures = menuContent.flatMap(category => 
      category.places.flatMap(place => {
        const pointData = mapPoints[place.id] || { coords: [centerMap], icon: place.icon };
        
        return pointData.coords.map((coord, index) => ({
          id: `${place.id}-${index}`,
          placeId: place.id,
          type: "Feature",
          balloon: place.label,
          balloonDesc: place.description || '',
          geometry: { coordinates: coord },
          properties: { iconCaption: place.label },
          options: { 
            iconImageHref: pointData.icon.startsWith('/local') 
              ? `https://ngk-dev.tmweb.ru${pointData.icon}`
              : pointData.icon,
            iconImageSize: [76, 46]
          },
          visible: true
        }));
      })
    );

    const initialObjects = [
      {
        id: 1,
        coordinates: [[59.81255996, 30.07559081], [59.80457114, 30.06248525]],
        link: "#"
      },
      {
        id: 2,
        coordinates: [[59.81355558, 30.08807068], [59.80589978, 30.09751206]],
        link: "#"
      }
    ];

    setFeatures(initialFeatures);
    setObjects(initialObjects);
  }, []);

  const handlePlaceCheckboxChange = (placeId, isChecked) => {
    setFeatures(prevFeatures => 
      prevFeatures.map(f => 
        f.placeId === placeId ? { ...f, visible: isChecked } : f
      )
    );
  };

  const handleCategoryCheckboxChange = (categoryId, isChecked) => {
    const placeIds = menuContent
      .find(c => c.id === categoryId)?.places
      .map(p => p.id) || [];
    
    setFeatures(prevFeatures => 
      prevFeatures.map(f => 
        placeIds.includes(f.placeId) ? { ...f, visible: isChecked } : f
      )
    );
  };

  const handleZoomIn = () => {
    if (mapInstance && currentZoom < maxZoom) {
      const newZoom = currentZoom + 1;
      mapInstance.setZoom(newZoom, { duration: 300 });
      setCurrentZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance && currentZoom > minZoom) {
      const newZoom = currentZoom - 1;
      mapInstance.setZoom(newZoom, { duration: 300 });
      setCurrentZoom(newZoom);
    }
  };

  const handleZoomChange = (e) => {
    setCurrentZoom(e.get('newZoom'));
  };

  return (
    <div className={styles.block}>
      <section className={styles.menuSection}>
        <YandexMapMenuComponent 
          onPlaceChange={handlePlaceCheckboxChange}
          onCategoryChange={handleCategoryCheckboxChange}
        />
      </section>
      
      <div className={styles.mapContainer}>
        <YMaps query={{ apikey: 'd0b038f4-74ea-4dfd-8eae-a8c2199d76c9' }}>
          <Map
            instanceRef={ref => {
              if (ref) {
                setMapInstance(ref);
                ref.behaviors.disable('scrollZoom');
                ref.events.add('boundschange', handleZoomChange);
              }
            }}
            defaultState={{ center: centerMap, zoom: zoomMap }}
            width="100%"
            height="600px"
            options={{ suppressMapOpenBlock: true }}
          >
            {features.filter(f => f.visible).map((f, i) => (
              <Placemark
                key={`marker-${i}`}
                geometry={f.geometry.coordinates}
                properties={{
                  hintContent: `
                    <div style="font-weight:500;width:220px;font-size:14px">
                      ${f.balloon}
                    </div>
                    <div style="font-weight:300;width:220px">
                      ${f.balloonDesc}
                    </div>
                  `,
                  iconCaption: f.properties.iconCaption
                }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: f.options.iconImageHref,
                  iconImageSize: f.options.iconImageSize,
                  iconImageOffset: [-38, -46],
                  balloonOffset: [0, -45]
                }}
              />
            ))}

            {objects.map((obj, i) => (
              <Rectangle
                key={`obj-${i}`}
                geometry={obj.coordinates}
                onClick={() => window.open(obj.link, "_blank")}
                options={{ fill: false, stroke: false }}
              />
            ))}
          </Map>
        </YMaps>

        <div className={styles.zoomControls}>
          <button 
            className={styles.zoomButton} 
            onClick={handleZoomIn}
            disabled={currentZoom >= maxZoom}
          >
            +
          </button>
          <button 
            className={styles.zoomButton} 
            onClick={handleZoomOut}
            disabled={currentZoom <= minZoom}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};
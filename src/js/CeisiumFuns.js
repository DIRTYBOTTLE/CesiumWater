import * as Cesium from "cesium";

function getWFS(viewer,layerInfo) {
    const url = 'http://localhost/geoserver/' + layerInfo.workSpace + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + layerInfo.workSpace + '%3A' + layerInfo.layerName + '&outputFormat=application%2Fjson';
    //viewer.scene.globe.depthTestAgainstTerrain = true;

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(url, {
        clampToGround: true,
        fill:Cesium.Color.AQUA,
    })).then(dataSource => {
        if (layerInfo.reference) {
            const entities = dataSource.entities.values;
            for (let i = 0; i < entities.length; i++) {
                let entity = entities[i];
                entity.billboard = new Cesium.BillboardGraphics({
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    image: "src/js/"+layerInfo.icon+".png",
                    width: 22,
                    height: 22,
                    clampToGround: false
                });
            }
        }
        dataSource.name=layerInfo.checkName;
        //dataSource.show=false;
    });
}

export {
    getWFS
}
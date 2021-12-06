import * as Cesium from "cesium";

function getWFS(viewer,layerInfo) {
    // const url = 'http://localhost:6060/geoserver/' + layerInfo.workSpace + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + layerInfo.workSpace + '%3A' + layerInfo.layerName + '&outputFormat=application%2Fjson';
    const url = 'http://8.130.15.177:6060/geoserver/' + layerInfo.workSpace + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + layerInfo.workSpace + '%3A' + layerInfo.layerName + '&outputFormat=application%2Fjson';
    console.log(url);
    //viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(url, {
        clampToGround: true,
        fill:new Cesium.Color(0.5, 0.2, 0.3, 0.5),
    })).then(dataSource => {
        if (layerInfo.reference) {
            const entities = dataSource.entities.values;
            for (let i = 0; i < entities.length; i++) {
                let entity = entities[i];
                // entity.billboard = new Cesium.BillboardGraphics({
                //     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                //     image: "src/js/"+layerInfo.icon+".png",
                //     width: 20,
                //     height: 20,
                //     clampToGround: false
                // });
                entity.billboard = new Cesium.BillboardGraphics(layerInfo.options);
            }
        }
        dataSource.name=layerInfo.checkName;
    });
}


function flyToArea(){
    viewer.camera.flyTo({
        destination : new Cesium.Cartesian3(-1359527.881887964, 5251080.84182769, 3347486.3154035173),
        orientation: {
            heading : 0.6321958327174828,
            pitch : -0.29359391259896683,
            //   roll : 0.0                             // default value
        }
    });
}

function flyTo(lon,lat){
    // viewer.camera.flyTo({destination : Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0)});
    viewer.camera.flyTo({destination : Cesium.Cartesian3.fromDegrees(lon, lat, 500.0)});
}

function layerShow1(layerInfos,id){
    if(!layerInfos[id].loaded){
        getWFS(viewer,layerInfos[id]);
        layerInfos[id].loaded = true;
        return
    }
    if(layerInfos[id].loaded){
        viewer.dataSources.getByName(layerInfos[id].checkName)[0].show = !viewer.dataSources.getByName(layerInfos[id].checkName)[0].show;
    }
}

export {
    getWFS,
    flyToArea,
    layerShow1,
    flyTo
}

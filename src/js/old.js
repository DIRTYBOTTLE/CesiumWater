import * as Cesium from "cesium";

function getWFS(viewer,layerInfo) {
    for(let i =0;i<layerInfo.length;i++) {
        let item = layerInfo[i]
        const url = 'http://localhost/geoserver/' + item.workSpace + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + item.workSpace + '%3A' + item.layerName + '&outputFormat=application%2Fjson';

        viewer.dataSources.add(Cesium.GeoJsonDataSource.load(url, {
            clampToGround: true
        })).then(dataSource => {
            if (item.reference) {
                const entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    let entity = entities[i];
                    entity.billboard = undefined;
                    // entity.point = new Cesium.PointGraphics({
                    //     color: Cesium.Color.RED,
                    //     pixelSize: 10,
                    //     heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
                    // });
                    entity.billboard = new Cesium.BillboardGraphics({
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        image: "src/js/"+item.icon+".png",
                        width: 22,
                        height: 22,
                        clampToGround: false
                    });
                    // entity.billboard.heightReference = new Cesium.ConstantProperty(Cesium.HeightReference.CLAMP_TO_GROUND);
                    // entity.billboard.verticalOrigin =  new Cesium.ConstantProperty(Cesium.VerticalOrigin.BOTTOM);
                    // entity.billboard.image =  new Cesium.ConstantProperty("./水滴.png");
                }
            }
            dataSource.name=item.checkName;
            //console.log(dataSource.name);
            dataSource.show=false;
        });

        //dataSource.show = false;
        // viewer.dataSources.add(dataSource);
        //addSource(viewer,dataSource);
        //const dataSource = viewer.dataSources.add(Cesium.GeoJsonDataSource.load(url,options));
        //if(item.reference){


        // dataSource.then(function (dataSource) {




        //     viewer.dataSources.add(dataSource);
        //     viewer.dataSources.get(i).show = false;
        // });


        //}
    }
    // });
}

function addSource(viewer,dataSource){
    viewer.dataSources.add(dataSource);
}

export {
    getWFS
}
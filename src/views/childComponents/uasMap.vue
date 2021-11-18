<template>
  <div class="map" ref="map"></div>
</template>

<script>
import { Vector as SourceVec } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";
import { Vector as LayerVec } from "ol/layer";
export default {
  name: "uasMap",
  data() {
    return {
      map: null,
      isVisible: true,
      mapBaseLayers: [
        new ol.layer.Group({
          name: "yx",
          title: "影像",
          type: "base",
          combine: true,
          visible: true,
          layers: [
            new ol.layer.Tile({
              source: new ol.source.XYZ({
                title: "天地图影像",
                url: "http://t2.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=3352a450f393157074884346f937c47d",
              }),
            }),
            new ol.layer.Tile({
              source: new ol.source.XYZ({
                title: "天地图影像标注",
                url: "http://t2.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=3352a450f393157074884346f937c47d",
              }),
            }),
          ],
        }),
        new ol.layer.Group({
          name: "sl",
          title: "地图",
          type: "base",
          combine: true,
          visible: false,
          layers: [
            new ol.layer.Tile({
              source: new ol.source.XYZ({
                title: "天地图路网",
                url: "http://t2.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=3352a450f393157074884346f937c47d",
              }),
            }),
            new ol.layer.Tile({
              source: new ol.source.XYZ({
                title: "天地图文字标注",
                url: "http://t2.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=3352a450f393157074884346f937c47d",
              }),
            }),
          ],
        }),
        new ol.layer.Group({
          name: "dx",
          title: "地形",
          type: "base",
          combine: true,
          visible: false,
          layers: [
            new ol.layer.Tile({
              source: new ol.source.XYZ({
                title: "天地图地形",
                url: "http://t2.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=3352a450f393157074884346f937c47d",
              }),
            }),
            new ol.layer.Tile({
              source: new ol.source.XYZ({
                title: "天地图地形标注",
                url: "http://t2.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=3352a450f393157074884346f937c47d",
              }),
            }),
          ],
        }),
      ],
    };
  },
  mounted() {
    this.initMap();
    this.vectorTileLayer();
  },
  methods: {
    initMap() {
      this.map = new ol.Map({
        layers: this.mapBaseLayers, //所有底图,
        target: this.$refs.map,
        controls: ol.control.defaults({
          attribution: false,
          rotate: false,
          zoom: false,
        }),
        view: new ol.View({
          zoom: 11,
          center: ol.proj.fromLonLat([120.962527939, 29.415279039]),
        }),
      });
    },
    vectorTileLayer() {
      // 创建矢量容器
      var vectorSource = new SourceVec({});
      //创建图标特性
      var iconFeature = new Feature({
        geometry: new Point([120.962527939, 29.415279039], "XY"),
      });

      //将图标特性添加进矢量中
      vectorSource.addFeature(iconFeature);
      //创建图标样式
      var iconStyle = new Style({
        image: new Icon({
          opacity: 0.75,
          src: "./js/logo.png",
        }),
      });
      //创建矢量层
      var vectorLayer = new LayerVec({
        source: vectorSource,
        style: iconStyle,
      });
      //添加进map
      this.map.addLayer(vectorLayer);
    },
  },
};
</script>

<style scoped>
.map {
  position: absolute;
  height: 90%;
  left: 200px;
  width: 100%;
}
</style>
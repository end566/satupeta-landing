var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_BatasAdministrasi_1 = new ol.format.GeoJSON();
var features_BatasAdministrasi_1 = format_BatasAdministrasi_1.readFeatures(json_BatasAdministrasi_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BatasAdministrasi_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BatasAdministrasi_1.addFeatures(features_BatasAdministrasi_1);
var lyr_BatasAdministrasi_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BatasAdministrasi_1, 
                style: style_BatasAdministrasi_1,
                popuplayertitle: 'Batas Administrasi',
                interactive: true,
                title: '<img src="styles/legend/BatasAdministrasi_1.png" /> Batas Administrasi'
            });
var format_JaringanTransportasi_2 = new ol.format.GeoJSON();
var features_JaringanTransportasi_2 = format_JaringanTransportasi_2.readFeatures(json_JaringanTransportasi_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_JaringanTransportasi_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_JaringanTransportasi_2.addFeatures(features_JaringanTransportasi_2);
var lyr_JaringanTransportasi_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_JaringanTransportasi_2, 
                style: style_JaringanTransportasi_2,
                popuplayertitle: 'Jaringan Transportasi',
                interactive: true,
    title: 'Jaringan Transportasi<br />\
    <img src="styles/legend/JaringanTransportasi_2_0.png" /> Jalan Arteri<br />\
    <img src="styles/legend/JaringanTransportasi_2_1.png" /> Jalan Kolektor<br />\
    <img src="styles/legend/JaringanTransportasi_2_2.png" /> Jalan Lokal<br />\
    <img src="styles/legend/JaringanTransportasi_2_3.png" /> Jalan Lingkungan<br />\
    <img src="styles/legend/JaringanTransportasi_2_4.png" /> Lainnya<br />' });
var format_Infrastruktur_3 = new ol.format.GeoJSON();
var features_Infrastruktur_3 = format_Infrastruktur_3.readFeatures(json_Infrastruktur_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Infrastruktur_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Infrastruktur_3.addFeatures(features_Infrastruktur_3);
cluster_Infrastruktur_3 = new ol.source.Cluster({
  distance: 30,
  source: jsonSource_Infrastruktur_3
});
var lyr_Infrastruktur_3 = new ol.layer.Vector({
                declutter: false,
                source:cluster_Infrastruktur_3, 
                style: style_Infrastruktur_3,
                popuplayertitle: 'Infrastruktur',
                interactive: true,
    title: 'Infrastruktur<br />\
    <img src="styles/legend/Infrastruktur_3_0.png" /> Energi<br />\
    <img src="styles/legend/Infrastruktur_3_1.png" /> Fasum<br />\
    <img src="styles/legend/Infrastruktur_3_2.png" /> Kesehatan<br />\
    <img src="styles/legend/Infrastruktur_3_3.png" /> Pemerintahan<br />\
    <img src="styles/legend/Infrastruktur_3_4.png" /> Pendidikan<br />\
    <img src="styles/legend/Infrastruktur_3_5.png" /> Peribadatan<br />\
    <img src="styles/legend/Infrastruktur_3_6.png" /> Transportasi<br />' });

lyr_OpenStreetMap_0.setVisible(true);lyr_BatasAdministrasi_1.setVisible(true);lyr_JaringanTransportasi_2.setVisible(true);lyr_Infrastruktur_3.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_BatasAdministrasi_1,lyr_JaringanTransportasi_2,lyr_Infrastruktur_3];
lyr_BatasAdministrasi_1.set('fieldAliases', {'PROVINSI': 'PROVINSI', 'KABUPATEN': 'KABUPATEN', 'KECAMATAN': 'KECAMATAN', 'DESAKEL': 'DESAKEL', 'SUMBER': 'SUMBER', 'LUASHA': 'LUASHA', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', });
lyr_JaringanTransportasi_2.set('fieldAliases', {'OBJECTID_1': 'OBJECTID_1', 'OBJECTID_2': 'OBJECTID_2', 'JENIS': 'JENIS', 'FUNGSI': 'FUNGSI', 'NAMOBJ': 'NAMOBJ', 'SUMBER': 'SUMBER', 'Shape_Leng': 'Shape_Leng', 'Shape_Le_1': 'Shape_Le_1', 'Shape_Le_2': 'Shape_Le_2', 'Shape_Le_3': 'Shape_Le_3', });
lyr_Infrastruktur_3.set('fieldAliases', {'No_': 'No_', 'Keterangan': 'Keterangan', 'x': 'x', 'y': 'y', 'Jenis': 'Jenis', });
lyr_BatasAdministrasi_1.set('fieldImages', {'PROVINSI': 'TextEdit', 'KABUPATEN': 'TextEdit', 'KECAMATAN': 'TextEdit', 'DESAKEL': 'TextEdit', 'SUMBER': 'TextEdit', 'LUASHA': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', });
lyr_JaringanTransportasi_2.set('fieldImages', {'OBJECTID_1': 'TextEdit', 'OBJECTID_2': 'TextEdit', 'JENIS': 'TextEdit', 'FUNGSI': 'TextEdit', 'NAMOBJ': 'TextEdit', 'SUMBER': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Le_1': 'TextEdit', 'Shape_Le_2': 'TextEdit', 'Shape_Le_3': 'TextEdit', });
lyr_Infrastruktur_3.set('fieldImages', {'No_': 'TextEdit', 'Keterangan': 'TextEdit', 'x': 'TextEdit', 'y': 'TextEdit', 'Jenis': 'TextEdit', });
lyr_BatasAdministrasi_1.set('fieldLabels', {'PROVINSI': 'no label', 'KABUPATEN': 'no label', 'KECAMATAN': 'inline label - always visible', 'DESAKEL': 'no label', 'SUMBER': 'no label', 'LUASHA': 'inline label - always visible', 'Shape_Leng': 'no label', 'Shape_Area': 'no label', });
lyr_JaringanTransportasi_2.set('fieldLabels', {'OBJECTID_1': 'no label', 'OBJECTID_2': 'no label', 'JENIS': 'inline label - always visible', 'FUNGSI': 'inline label - visible with data', 'NAMOBJ': 'inline label - always visible', 'SUMBER': 'no label', 'Shape_Leng': 'no label', 'Shape_Le_1': 'no label', 'Shape_Le_2': 'no label', 'Shape_Le_3': 'no label', });
lyr_Infrastruktur_3.set('fieldLabels', {'No_': 'no label', 'Keterangan': 'inline label - always visible', 'x': 'no label', 'y': 'no label', 'Jenis': 'no label', });
lyr_Infrastruktur_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
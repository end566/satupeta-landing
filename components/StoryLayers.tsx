export interface StoryItem {
    id: number;
    title: string;
    text: string;
    center: [number, number];
    zoom: number;
    layer: string; // path GeoJSON
    color: string;
}

export const storyLayers: StoryItem[] = [
    {
        id: 1,
        title: "Batas Kecamatan Teluk Bintuni",
        text: "Menunjukkan batas administratif kecamatan di Kabupaten Teluk Bintuni.",
        //center: [-2.11, 133.53],
        center: [-2.1125, 133.527],
        zoom: 8,
        layer: "/data/batas_kecamatan.geojson",
        color: "#2563eb",
    },
    {
        id: 2,
        title: "Kawasan Hutan Lindung",
        text: "Sebagian besar wilayah terdiri dari hutan mangrove dan area konservasi.",
        //center: [-2.0, 133.6],
        center: [-2.1125, 133.527],
        zoom: 8,
        layer: "/data/hutan.geojson",
        color: "#16a34a",
    },
    {
        id: 3,
        title: "Kawasan Industri Tangguh LNG",
        text: "Lokasi industri gas terbesar di Papua Barat.",
        //center: [-1.9, 133.1],
        center: [-2.1125, 133.527],
        zoom: 8,
        layer: "/data/industri.geojson",
        color: "#ea580c",
    },
];

import { TIFFLoader } from 'three/addons/loaders/TIFFLoader.js';

let THREE;

function loadTiffTexture(loader, path)
{
    var texture = loader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

export class SkinHandling {

    constructor(three)
    {
        THREE = three;
        this.loader = new TIFFLoader();
    }

    loadSnakeSkin(material)
    {
        var baseTex = loadTiffTexture(this.loader, '/img/textures/snakeskin/TexturesCom_SnakeSkin_512_albedo.tif');
        material.map = baseTex;
        var normalTex = loadTiffTexture(this.loader, '/img/textures/snakeskin/TexturesCom_SnakeSkin_512_normal.tif');
        material.normalMap = normalTex;
        var roughMap = loadTiffTexture(this.loader, '/img/textures/snakeskin/TexturesCom_SnakeSkin_512_roughness.tif');
        material.roughnessMap = roughMap;
        material.aoMap = null;
        material.metalnessMap = null;
        material.metalness = 0;
        material.needsUpdate = true;
    }

    loadCotton(material)
    {
        var baseTex = loadTiffTexture(this.loader, '/img/textures/cotton/TexturesCom_Fabric_Cotton_1K_albedo.tif');
        material.map = baseTex;
        var normalTex = loadTiffTexture(this.loader, '/img/textures/cotton/TexturesCom_Fabric_Cotton_1K_normal.tif');
        material.normalMap = normalTex;
        var roughMap = loadTiffTexture(this.loader, '/img/textures/cotton/TexturesCom_Fabric_Cotton_1K_roughness.tif');
        material.roughnessMap = roughMap;
        material.aoMap = null;
        material.metalnessMap = null;
        material.metalness = 0;
        material.needsUpdate = true;
    }

    loadDenim(material)
    {
        var baseTex = loadTiffTexture(this.loader, '/img/textures/denim/TexturesCom_Fabric_Denim_1K_albedo.tif');
        material.map = baseTex;
        var normalTex = loadTiffTexture(this.loader, '/img/textures/denim/TexturesCom_Fabric_Denim_1K_normal.tif');
        material.normalMap = normalTex;
        var roughMap = loadTiffTexture(this.loader, '/img/textures/denim/TexturesCom_Fabric_Denim_1K_roughness.tif');
        material.roughnessMap = roughMap;
        material.aoMap = null;
        material.metalnessMap = null;
        material.metalness = 0;
        material.needsUpdate = true;
    }

    loadGold(material)
    {
        var baseTex = loadTiffTexture(this.loader, '/img/textures/gold/TexturesCom_Metal_GoldOld_1K_albedo.tif');
        material.map = baseTex;
        var normalTex = loadTiffTexture(this.loader, '/img/textures/gold/TexturesCom_Metal_GoldOld_1K_normal.tif');
        material.normalMap = normalTex;
        var roughMap = loadTiffTexture(this.loader, '/img/textures/gold/TexturesCom_Metal_GoldOld_1K_roughness.tif');
        material.roughnessMap = roughMap;
        var aoMap = loadTiffTexture(this.loader, '/img/textures/gold/TexturesCom_Metal_GoldOld_1K_ao.tif');
        material.aoMap = aoMap;
        material.emissiveMap = null;
        material.emissiveIntensity = 0;
        material.metalnessMap = null;
        material.metalness = 0.5;
        material.needsUpdate = true;
    }

    loadLeather(material)
    {
        var baseTex = loadTiffTexture(this.loader, '/img/textures/leather/TexturesCom_Leather_Weave_512_albedo.tif');
        material.map = baseTex;
        var normalTex = loadTiffTexture(this.loader, '/img/textures/leather/TexturesCom_Leather_Weave_512_normal.tif');
        material.normalMap = normalTex;
        var roughMap = loadTiffTexture(this.loader, '/img/textures/leather/TexturesCom_Leather_Weave_512_roughness.tif');
        material.roughnessMap = roughMap;
        material.aoMap = null;
        material.emissiveMap = null;
        material.emissiveIntensity = 0;
        material.metalnessMap = null;
        material.metalness = 0;
        material.needsUpdate = true;
    }

    loadPolypropylene(material)
    {
//        var baseTex = loadTiffTexture(this.loader, '/img/textures/polypropylene/TexturesCom_Plastic_PolypropyleneRough_1K_albedo.tif');
        material.map = null;
        var normalTex = loadTiffTexture(this.loader, '/img/textures/polypropylene/TexturesCom_Plastic_PolypropyleneRough_1K_normal.tif');
        material.normalMap = normalTex;
        var roughMap = loadTiffTexture(this.loader, '/img/textures/polypropylene/TexturesCom_Plastic_PolypropyleneRough_1K_roughness.tif');
        material.roughnessMap = roughMap;
        material.aoMap = null;
        material.emissiveMap = null;
        material.emissiveIntensity = 0;
        material.needsUpdate = true;
    }

    loadDefaultManequin(material)
    {
        var baseTex = new THREE.TextureLoader().load('/img/textures/tex_mannequin_graywireframe.png');
        material.map = baseTex;
        material.map.flipY = false;
        material.map.encoding = 3001; 
        material.normalMap = null;
        material.roughnessMap = null;
        material.aoMap = null;
        material.emissiveMap = null;
        material.emissiveIntensity = 1;
        material.metalnessMap = null;
        material.metalness = 0;
        material.needsUpdate = true;
    }

    loadGreyManequin(material)
    {
        var baseTex = new THREE.TextureLoader().load('/img/textures/tex_mannequin_gray.png');
        material.map = baseTex;
        material.map.flipY = false;
        material.normalMap = null;
        material.roughnessMap = null;
        material.aoMap = null;
        material.emissiveMap = null;
        material.emissiveIntensity = 0;
        material.metalnessMap = null;
        material.metalness = 0.5;
        material.needsUpdate = true;
    }

    loadDefaultPants(material)
    {
        var baseTex = new THREE.TextureLoader().load('/img/textures/track_pants/Substance_Material_BaseColor.png');
        material.map = baseTex;
        material.map.flipY = false;
        material.map.encoding = 3001; 
        material.normalMap = new THREE.TextureLoader().load('/img/textures/track_pants/Substance_Material_Normal.png');
        material.normalMap.flipY = false;
        material.roughnessMap = new THREE.TextureLoader().load('/img/textures/track_pants/Substance_Material_Roughness.png');
        material.roughnessMap.flipY = false;
        material.aoMap = null;
        material.emissiveMap = new THREE.TextureLoader().load('/img/textures/track_pants/Substance_Material_Emissive.png');
        material.emissiveIntensity = 1;
        material.metalnessMap = new THREE.TextureLoader().load('/img/textures/track_pants/Substance_Material_Metallic.png');
        material.metalness = 1;
        material.needsUpdate = true;
    }

    loadGlasses(material)
    {
        var baseTex = new THREE.TextureLoader().load('/img/textures/glasses/Substance_DefaultMaterial_BaseColor.png');
        material.map = baseTex;
        material.map.flipY = false;
        material.map.encoding = 3001; 
        material.normalMap = new THREE.TextureLoader().load('/img/textures/glasses/Substance_DefaultMaterial_Normal.png');
        material.normalMap.flipY = false;
        material.roughnessMap = new THREE.TextureLoader().load('/img/textures/glasses/Substance_DefaultMaterial_Roughness.png');
        material.roughnessMap.flipY = false;
        material.aoMap = null;
        material.emissiveMap = new THREE.TextureLoader().load('/img/textures/glasses/Substance_DefaultMaterial_Emissive.png');
        material.emissiveIntensity = 1;
        material.metalnessMap = new THREE.TextureLoader().load('/img/textures/glasses/Substance_DefaultMaterial_Metallic.png');
        material.metalness = 1;
        material.color.r=0;
        material.color.g=0;
        material.color.b=0;
        material.needsUpdate = true;
    }

    removeGlassMaps(material)
    {
        material.map = null;
        material.normalMap = null;
        material.roughnessMap = null;
        material.aoMap = null;
        material.emissiveMap = null;
        material.metalnessMap = null;
        material.metalness = 0;
        material.needsUpdate = true;
    }

}


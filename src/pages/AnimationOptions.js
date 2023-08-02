import GUI from 'lil-gui'; 
import {SkinHandling} from "./SkinHandling.js"

let THREE;

export class SkinOptions {
    constructor(three, skin, pants, glasses, mixer, div) {
      THREE = three;
      this.skin = skin;
      this.pants = pants;
      this.glasses = glasses;
      this.mixer = mixer;
      this.skinHandler = new SkinHandling(THREE);

      // Create a new GUI instance
      this.panel = new GUI( {title: "⚙️", container: div} );
      this.speed = this.panel.addFolder("Avspilling");
      this.hud = this.panel.addFolder('Hud');
      this.bukser = this.panel.addFolder('Bukser');
      this.glass = this.panel.addFolder('Briller');

      var settings = {
        'Treningsbukse': () => this.SetTrackPants(),
        'Joggebukse': () => this.SetCottonPants(),
        'Jeans': () => this.SetJeans(),
        'Lærbukse': () => this.SetLeatherPants(),
        'Slangebukse': () => this.SetSnakePants(),
        'Gullbukse': () => this.SetGoldPants(),
        'Mesh': () => this.SetMesh(),
        'Blank': () => this.SetBlank(),
        'Slange': () => this.SetSnakeSkin(),
        'Gull': () => this.SetGoldSkin(),
        'Plast': () => this.SetPlasticSkin()
      };

      this.mesh = this.hud.add(settings, "Mesh");
      this.mesh.disable();
      this.blank = this.hud.add(settings, 'Blank');
      this.snakeSkin = this.hud.add(settings, 'Slange');
      this.goldSkin = this.hud.add(settings, 'Gull');
      this.plasticSkin = this.hud.add(settings, 'Plast');
      this.hud.addColor(skin.material, 'color').name( 'Farge' );

      this.trackPants = this.bukser.add(settings, 'Treningsbukse');
      this.trackPants.disable();
      this.cottonPants = this.bukser.add(settings, 'Joggebukse');
      this.jeans = this.bukser.add(settings, 'Jeans'); 
      this.leatherPants = this.bukser.add(settings, 'Lærbukse');     
      this.snakePants = this.bukser.add(settings, 'Slangebukse');
      this.goldPants = this.bukser.add(settings, 'Gullbukse');
      this.bukser.addColor(pants.material, 'color').name( 'Farge' );

      this.glass.add({'Briller': true}, 'Briller').onChange( () => this.GlassVisibility() );
      this.glass.addColor( this.glasses.material, 'color' ).name( 'Farge' ).onChange( () => {
        this.skinHandler.removeGlassMaps(this.glasses.material);
      });
      this.glass.add( { reset: () => {
        if (!this.glasses.material.map) {
            this.skinHandler.loadGlasses(this.glasses.material);
        }
       }}, 'reset' ).name( 'Svarte briller' );

      this.speed.add({'Hastighet':1.0}, 'Hastighet', 0.0,2.0,0.01).onChange((speed) => {
        this.mixer.timeScale = speed;
      });
      
      this.panel.close();
    }

    EnableAllSkins()
    {
        this.mesh.enable();
        this.blank.enable();
        this.snakeSkin.enable();
        this.goldSkin.enable();
        this.plasticSkin.enable();
        this.skin.material.transparent = false;
    }

    SetMesh()
    {
        this.skinHandler.loadDefaultManequin(this.skin.material);
        this.EnableAllSkins();
        this.mesh.disable();
    }

    SetBlank()
    {
        this.skinHandler.loadGreyManequin(this.skin.material);
        this.EnableAllSkins();
        this.blank.disable();
    }

    SetSnakeSkin()
    {
        this.skinHandler.loadSnakeSkin(this.skin.material);
        this.EnableAllSkins();
        this.snakeSkin.disable();
    }

    SetGoldSkin()
    {
        this.skinHandler.loadGold(this.skin.material);
        this.EnableAllSkins();
        this.goldSkin.disable();
    }

    SetPlasticSkin()
    {
        this.skinHandler.loadPolypropylene(this.skin.material);
        this.EnableAllSkins();
        this.skin.material.transparent = true;
        this.skin.material.opacity = 0.75;
        this.plasticSkin.disable();
    }

    SetTrackPants()
    {
        this.skinHandler.loadDefaultPants(this.pants.material);
        this.EnableAllPants();
        this.trackPants.disable();
    }

    SetSnakePants()
    {
        this.skinHandler.loadSnakeSkin(this.pants.material)
        this.EnableAllPants();
        this.snakePants.disable();
    }

    SetCottonPants()
    {
        this.skinHandler.loadCotton(this.pants.material);
        this.EnableAllPants();
        this.cottonPants.disable();
    }

    SetJeans()
    {
        this.skinHandler.loadDenim(this.pants.material);
        this.EnableAllPants();
        this.jeans.disable();
    }

    SetGoldPants()
    {
        this.skinHandler.loadGold(this.pants.material);
        this.EnableAllPants();
        this.goldPants.disable();
    }

    SetLeatherPants()
    {
        this.skinHandler.loadLeather(this.pants.material);
        this.EnableAllPants();
        this.leatherPants.disable();
    }

    EnableAllPants(){
        this.trackPants.enable();
        this.snakePants.enable();
        this.cottonPants.enable();
        this.jeans.enable();
        this.goldPants.enable();
        this.leatherPants.enable();
    }
  
    GlassVisibility()
    {
        this.glasses.visible = !this.glasses.visible;
    }
  
  }
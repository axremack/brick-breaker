//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                               Scene.ts
//==================================================================================================

// Classe  S c e n e //-----------------------------------------------------------------------------
class Scene extends Sprite {
 //----------------------------------------------------------------------------------------Attributs
 /* Declarer ici les attributs de la scene. */
public balle_ : Balle;
public palet_ : Palet;
public briques_ : Array <Sprite>;
public nbBrique_ : number;
public compteur_ : number;

 //-------------------------------------------------------------------------------------Constructeur
 public constructor(balise : HTMLElement) {
  super(balise);
  this.setDimension(640,480);
  this.setX((window.innerWidth - this.getLargeur()) / 2);
  this.setY((window.innerHeight - this.getHauteur()) / 2);
 }

 //-----------------------------------------------------------------------------------------demarrer
 public demarrer() {
  /* Ecrire ici le code qui demarre la scene. */
  this.balle_ = new Balle(document.createElement("img"), this);
  this.balle_.setImage("balle.png", 32,32);
  this.ajouter(this.balle_);
  this.balle_.setXY(23,37);

  let zone : Sprite = new Sprite(document.getElementById("zone"));
  zone.setXY(10,10);
  zone.setDimension(this.getLargeur()-20, this.getHauteur()-20);

  this.balle_.setLimites(zone);
  this.balle_.setXY(this.balle_.xmax_,this.balle_.ymax_);

  this.balle_.vx_=4*Math.random()-2;
  this.balle_.vy_=-2;
  this.balle_.animer();
  //setTimeout( () => {balle.figer();}, 20000);


  this.palet_ = new Palet(document.createElement("img"));
  this.palet_.setImage("palet.jpg", 50,20);
  this.ajouter(this.palet_);
  this.palet_.setXY(zone.getLargeur()/2,zone.getHauteur()-this.palet_.getHauteur());

  this.palet_.setLimites(zone);

  this.palet_.animer();
  //setTimeout( () => {palet.figer();}, 5000);


  let nbligne : number = 2;
  let nbcol : number = 4;
  let xs : number = zone.getLargeur()/(nbcol+1);
  let ys : number = zone.getHauteur()*0.5/(nbligne+1);
  this.briques_= new Array <Sprite>(); 
  this.nbBrique_ = 0;
  
  for (let i : number = 0; i<nbligne; i++){
      for(let j : number = 0; j<nbcol; j++){
          let brique : Sprite = new Sprite (document.createElement('img'));
          brique.setImage('brique.png', 64, 32);
          brique.setX((j+1)*xs-brique.getLargeur()/2+zone.getX());
          brique.setY((i+1)*ys-brique.getHauteur()/2+zone.getY());
          this.ajouter(brique);
          this.briques_[this.nbBrique_]=brique;
          this.nbBrique_++;
      }
  }



  
 }

 //------------------------------------------------------------------------------------------arreter
 public arreter() {
  /* Ecrire ici le code qui termine la scene. */
 }
}

// Fin //-------------------------------------------------------------------------------------------

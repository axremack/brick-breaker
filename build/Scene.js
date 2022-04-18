"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(balise) {
        var _this = _super.call(this, balise) || this;
        _this.setDimension(640, 480);
        _this.setX((window.innerWidth - _this.getLargeur()) / 2);
        _this.setY((window.innerHeight - _this.getHauteur()) / 2);
        return _this;
    }
    Scene.prototype.demarrer = function () {
        this.balle_ = new Balle(document.createElement("img"), this);
        this.balle_.setImage("balle.png", 32, 32);
        this.ajouter(this.balle_);
        this.balle_.setXY(23, 37);
        var zone = new Sprite(document.getElementById("zone"));
        zone.setXY(10, 10);
        zone.setDimension(this.getLargeur() - 20, this.getHauteur() - 20);
        this.balle_.setLimites(zone);
        this.balle_.setXY(this.balle_.xmax_, this.balle_.ymax_);
        this.balle_.vx_ = 4 * Math.random() - 2;
        this.balle_.vy_ = -2;
        this.balle_.animer();
        this.palet_ = new Palet(document.createElement("img"));
        this.palet_.setImage("palet.jpg", 50, 20);
        this.ajouter(this.palet_);
        this.palet_.setXY(zone.getLargeur() / 2, zone.getHauteur() - this.palet_.getHauteur());
        this.palet_.setLimites(zone);
        this.palet_.animer();
        var nbligne = 2;
        var nbcol = 4;
        var xs = zone.getLargeur() / (nbcol + 1);
        var ys = zone.getHauteur() * 0.5 / (nbligne + 1);
        this.briques_ = new Array();
        this.nbBrique_ = 0;
        for (var i = 0; i < nbligne; i++) {
            for (var j = 0; j < nbcol; j++) {
                var brique = new Sprite(document.createElement('img'));
                brique.setImage('brique.png', 64, 32);
                brique.setX((j + 1) * xs - brique.getLargeur() / 2 + zone.getX());
                brique.setY((i + 1) * ys - brique.getHauteur() / 2 + zone.getY());
                this.ajouter(brique);
                this.briques_[this.nbBrique_] = brique;
                this.nbBrique_++;
            }
        }
    };
    Scene.prototype.arreter = function () {
    };
    return Scene;
}(Sprite));

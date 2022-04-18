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
var Balle = (function (_super) {
    __extends(Balle, _super);
    function Balle(balise, scene) {
        var _this = _super.call(this, balise) || this;
        _this.xmin_ = 0;
        _this.xmax_ = 0;
        _this.ymin_ = 0;
        _this.ymax_ = 0;
        _this.vx_ = 0;
        _this.vy_ = 0;
        _this.timer_ = 0;
        _this.scene_ = scene;
        return _this;
    }
    Balle.prototype.setLimites = function (zone) {
        this.xmin_ = zone.getX();
        this.xmax_ = zone.getX() + zone.getLargeur() - this.getLargeur();
        this.ymin_ = zone.getY();
        this.ymax_ = zone.getY() + zone.getHauteur() - this.getHauteur();
    };
    Balle.prototype.bouger = function () {
        var x = this.getX() + this.vx_;
        var y = this.getY() + this.vy_;
        if (y < this.ymin_) {
            y = this.ymin_;
            this.vy_ = -1 * this.vy_;
        }
        else if (x < this.xmin_) {
            x = this.xmin_;
            this.vx_ = -1 * this.vx_;
        }
        else if (x > this.xmax_) {
            x = this.xmax_;
            this.vx_ = -1 * this.vx_;
        }
        else if (y > this.ymax_) {
            y = this.ymax_;
            this.vy_ = -1 * this.vy_;
        }
        if (Sprite.collision(this.getCercle(), this.scene_.palet_.getRectangle())) {
            y = this.scene_.palet_.getY() - this.getHauteur();
            this.vy_ = -1 * this.vy_;
            var v = Math.sqrt(this.vx_ * this.vx_ + this.vy_ * this.vy_);
            if (v < 8) {
                this.vx_ = 1.1 * this.vx_;
                this.vy_ = 1.1 * this.vy_;
            }
        }
        var briques_ = this.scene_.briques_;
        var touche = false;
        for (var i = 0; i < briques_.length && !touche; i++) {
            if (briques_[i] != null && Sprite.collision(this.getCercle(), briques_[i].getRectangle())) {
                this.scene_.retirer(briques_[i]);
                this.vy_ = -1 * this.vy_;
                briques_[i] = null;
                touche = true;
            }
        }
        this.setXY(x, y);
    };
    Balle.prototype.animer = function () {
        var _this = this;
        this.timer_ = setInterval(function () { _this.bouger(); }, 1000 / 120);
    };
    Balle.prototype.figer = function () {
        clearInterval(this.timer_);
    };
    return Balle;
}(Sprite));

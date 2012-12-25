#pragma strict
public var animations : AnimationClip[];

function Start () {
	animation[animations[0].name].speed = 0.3;
	animation[animations[1].name].speed = 0.3;
	animation[animations[2].name].speed = 0.15;
	animation[animations[3].name].speed = 0.5;
}

function Update () {

}
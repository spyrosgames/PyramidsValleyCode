#pragma strict
public var firstAnimation : AnimationClip;
public var secondAnimation : AnimationClip;
public var thirdAnimation : AnimationClip;
public var fourthAnimation : AnimationClip;

function Awake()
{
	animation[firstAnimation.name].speed = 0.3;
	animation[secondAnimation.name].speed = 0.3;
	animation[thirdAnimation.name].speed = 0.3;
	animation[fourthAnimation.name].speed = 0.3;
}

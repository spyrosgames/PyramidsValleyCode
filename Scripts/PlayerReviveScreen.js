#pragma strict

public var AutoFireComponent : GameObject;
private var autoFireObj : AutoFire;

public var GesturesRecognizer : GameObject;

public var PotionButtonsHUDS : GameObject[];

public var ReviveScreen : GameObject;

public var HUDs : GameObject;

public var NGUIJoysticks : GameObject;

function Awake()
{
	autoFireObj = AutoFireComponent.GetComponent.<AutoFire>();
}

function OnReviveSignal()
{	
	HUDs.SetActiveRecursively(false);
	NGUIJoysticks.SetActiveRecursively(false);
	
	GesturesRecognizer.active = false;
	
	rigidbody.velocity = Vector3(0, 0, 0);
	rigidbody.constraints = RigidbodyConstraints.FreezeAll;
	autoFireObj.OnStopFire();
	
	//iTween.CameraFadeAdd();
	//iTween.CameraFadeTo(0.35, 1.2);
	
	/*
	for(var i : int = 0; i < PotionButtonsHUDS.length; i++)
	{
		PotionButtonsHUDS[i].SetActiveRecursively(false);
	}
	*/
	
	ReviveScreen.SetActiveRecursively(true);
	
	
}
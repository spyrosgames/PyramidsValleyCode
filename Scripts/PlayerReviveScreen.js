#pragma strict
private var JoystickRight : GameObject;
private var JoystickLeft : GameObject;

public var AutoFireComponent : GameObject;
private var autoFireObj : AutoFire;

public var gesturesRecognizer : GameObject;


function Awake()
{
	autoFireObj = AutoFireComponent.GetComponent.<AutoFire>();
}

function OnReviveSignal()
{
	JoystickRight = GameObject.Find("Joystick Right");
	JoystickLeft = GameObject.Find("Joystick Left");
	
	gesturesRecognizer.active = false;
	
	rigidbody.velocity = Vector3(0, 0, 0);
	rigidbody.constraints = RigidbodyConstraints.FreezeAll;
	autoFireObj.OnStopFire();
	
	JoystickRight.active = false;
	JoystickLeft.active = false;
	
	iTween.CameraFadeAdd();
	iTween.CameraFadeTo(0.35, 1.2);
}
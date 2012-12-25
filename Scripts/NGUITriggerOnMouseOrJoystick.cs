using UnityEngine;
using System.Collections;

public class NGUITriggerOnMouseOrJoystick : MonoBehaviour {

public SignalSender mouseDownSignals;
public SignalSender mouseUpSignals;

private bool state = false;

#if UNITY_IPHONE || UNITY_ANDROID
public UIJoystick[] joysticks;

void Start () {
	
}
#endif

void Update () {
#if UNITY_IPHONE || UNITY_ANDROID
	if (state == false && joysticks[0].tapCount > 0) {
		mouseDownSignals.SendSignals (this);
		state = true;
	}
	else if (joysticks[0].tapCount <= 0) {
		mouseUpSignals.SendSignals (this);
		state = false;
	}	
#else	
	#if !UNITY_EDITOR && (UNITY_XBOX360 || UNITY_PS3)
		// On consoles use the right trigger to fire
		var fireAxis : float = Input.GetAxis("TriggerFire");
		if (state == false && fireAxis >= 0.2) {
			mouseDownSignals.SendSignals (this);
			state = true;
		}
		else if (state == true && fireAxis < 0.2) {
			mouseUpSignals.SendSignals (this);
			state = false;
		}
	#else
		if (state == false && Input.GetMouseButtonDown (0)) {
			mouseDownSignals.SendSignals (this);
			state = true;
		}
		
		else if (state == true && Input.GetMouseButtonUp (0)) {
			mouseUpSignals.SendSignals (this);
			state = false;
		}
	#endif
#endif
}

}

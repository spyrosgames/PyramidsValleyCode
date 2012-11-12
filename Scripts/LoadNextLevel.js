#pragma strict


static var activateButton : boolean = true;
private var horizRatio = (Screen.width + 0.0) / 800;
private var vertRatio = (Screen.height + 0.0) / 480;

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0, 0, 0), Quaternion.identity, Vector3 (horizRatio, vertRatio, 1));
	GUI.enabled = activateButton;

}
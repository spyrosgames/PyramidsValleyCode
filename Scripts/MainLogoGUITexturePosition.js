#pragma strict
public var width : float;
public var height : float;

private var horizRatio = (Screen.width + 0.0) / 800;
private var vertRatio = (Screen.height + 0.0) / 480;


function Start () {
   guiTexture.pixelInset = Rect(Screen.width * 0.3, Screen.height * 0.37, 256, 128);
}

function Update () {

}
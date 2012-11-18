#pragma strict
private var originalWidth : float = 480;
private var originalHeight : float = 320;
private var currentWidth : float;
private var currentHeight : float;
private var currentXPosition : float;
private var currentYPosition : float;
private var currentXScale : float;
private var currentYScale : float;

function Awake()
{
	currentWidth = Screen.width;
	currentHeight = Screen.height;
	
	currentXPosition = transform.position.x;
	currentYPosition = transform.position.y;
	
	currentXScale = transform.localScale.x;
	currentYScale = transform.localScale.y;
}

function Start () {
	transform.position.x = currentXPosition / ((currentWidth / originalWidth) / (guiTexture.texture.width / guiTexture.texture.height));
	transform.position.y = currentYPosition * (currentHeight / originalHeight);
	
	transform.localScale.x = currentXScale * (currentWidth / originalWidth);
	transform.localScale.y = currentYScale * (currentHeight / originalHeight);
}

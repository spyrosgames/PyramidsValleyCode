#pragma strict

var m_NativeRatio : float = 1.5;
 
var currentRatio : float = (Screen.width+0.0) / Screen.height;
transform.localScale.x *= (m_NativeRatio / currentRatio);
#pragma strict

function OnHighlightAnimation()
{
	iTween.FadeTo(gameObject, 1, 0.5);
	yield WaitForSeconds(0.5);
	iTween.FadeTo(gameObject, 0.1, 0.5);
	yield WaitForSeconds(0.5);
	iTween.FadeTo(gameObject, 1, 0.5);
	yield WaitForSeconds(0.5);
	iTween.FadeTo(gameObject, 0.1, 0.5);
	yield WaitForSeconds(0.5);
	iTween.FadeTo(gameObject, 1, 0.5);
	yield WaitForSeconds(0.5);
	iTween.FadeTo(gameObject, 0.1, 0.5);
	yield WaitForSeconds(0.5);
	iTween.FadeTo(gameObject, 1, 0.5);
}
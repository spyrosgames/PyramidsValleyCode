using UnityEngine;
using System.Collections;

public class SurrenderButton : MonoBehaviour {
	public GameObject ReviveScreen;
	
	void OnClick()
	{
		ReviveScreen.SetActiveRecursively(false);
		
		iTween.CameraFadeAdd();
		iTween.CameraFadeTo( iTween.Hash("amount", 1, "time", 1));
		
		Invoke("LoadNextLevel", 1);
	}
	
	private void LoadNextLevel()
	{
		PlayerPrefs.SetString("LoadLevel", "MainMenu");
		Application.LoadLevel("Loading");		
	}
}

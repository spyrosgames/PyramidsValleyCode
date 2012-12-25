using UnityEngine;
using System.Collections;

public class ResumeGame : MonoBehaviour {

	void OnClick()
	{
		PlayerPrefs.SetString("LoadLevel", "WavesMenu");
		Application.LoadLevel("Loading");	
	}
}

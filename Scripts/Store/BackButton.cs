using UnityEngine;
using System.Collections;

public class BackButton : MonoBehaviour {

	void OnClick()
	{
		PlayerPrefs.SetString("LoadLevel", "WavesMenu");
		Application.LoadLevel("Loading");	
	}
}

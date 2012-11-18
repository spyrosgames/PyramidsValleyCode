using UnityEngine;
using System.Collections;

public class NewGame : MonoBehaviour {
	void OnClick()
	{
		PlayerPrefs.DeleteAll();
		PlayerPrefs.SetString("LoadLevel", "WavesMenu");
		Application.LoadLevel("Loading");
	}
}

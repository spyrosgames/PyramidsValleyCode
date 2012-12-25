using UnityEngine;
using System.Collections;

public class NewGame : MonoBehaviour {
	
	void OnClick()
	{	
		PlayerPrefs.DeleteAll();
		PlayerPrefs.SetString("LoadLevel", "FinalStore");
		Application.LoadLevel("Loading");
	}
}

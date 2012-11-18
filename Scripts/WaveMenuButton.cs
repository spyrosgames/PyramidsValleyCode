using UnityEngine;
using System.Collections;

public class WaveMenuButton : MonoBehaviour {
	public int waveNumber;

	void OnClick()
	{
		PlayerPrefs.SetInt("WaveNumber", waveNumber);
		PlayerPrefs.SetString("LoadLevel", "Bondo2Scene");
		Application.LoadLevel("Loading");
	}
}

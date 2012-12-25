using UnityEngine;
using System.Collections;

public class WaveMenuButton : MonoBehaviour {
	public int waveNumber;

	void OnClick()
	{
		PlayerPrefs.SetInt("WaveNumber", waveNumber);
		if(waveNumber != 1)
		{
			PlayerPrefs.SetString("LoadLevel", "Bondo2Scene");
		}
		else if(waveNumber == 1)
		{
			PlayerPrefs.SetString("LoadLevel", "ComicsScene");
		}
		Application.LoadLevel("Loading");
	}
}

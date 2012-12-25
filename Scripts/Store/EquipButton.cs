using UnityEngine;
using System.Collections;

public class EquipButton : MonoBehaviour {
	public string magicName;
	public GameObject equippedLabel;
	
	void OnClick()
	{
		PlayerPrefs.SetString(magicName+"MagicState", "Equipped");
		equippedLabel.SetActiveRecursively(true);
		this.gameObject.SetActiveRecursively(false);
	}
}

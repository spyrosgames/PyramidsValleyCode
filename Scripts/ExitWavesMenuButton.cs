using UnityEngine;
using System.Collections;

public class ExitWavesMenuButton : MonoBehaviour {
	public GameObject wavesPopupMenu;
	
	void OnClick()
	{
		wavesPopupMenu.SetActiveRecursively(false);
		this.gameObject.active = false;	
	}
}

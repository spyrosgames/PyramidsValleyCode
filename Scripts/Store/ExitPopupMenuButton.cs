using UnityEngine;
using System.Collections;

public class ExitPopupMenuButton : MonoBehaviour {
	public GameObject popupMenu;
	public GameObject otherStoreMenus;
	
	private UIButton[] otherStoreMenusButtons;
	void OnClick()
	{
		otherStoreMenusButtons = otherStoreMenus.GetComponentsInChildren<UIButton>();
		for(int i = 0; i < otherStoreMenusButtons.Length; i++)
		{
			otherStoreMenusButtons[i].enabled = false;	
		}
		popupMenu.SetActiveRecursively(false);	
	}
}

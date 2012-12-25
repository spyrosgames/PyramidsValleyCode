using UnityEngine;
using System.Collections;

public class OnStartPopupMenu : MonoBehaviour {
	public GameObject otherStoreMenus;
	private UIButton[] otherStoreMenusButtons;
	
 	void Awake()
	{
		if(otherStoreMenus != null)
		{
			otherStoreMenusButtons = otherStoreMenus.GetComponentsInChildren<UIButton>();
			for(int i = 0; i < otherStoreMenusButtons.Length; i++)
			{
				otherStoreMenusButtons[i].enabled = false;	
			}
		}
	}
}

using UnityEngine;
using System.Collections;

public class Loading : MonoBehaviour {
	private string nextLevelName;
	private UISlider loadingSlider;
	private AsyncOperation asyncOperation;
	// Use this for initialization
	void Awake()
	{
		loadingSlider = GetComponent<UISlider>();	
	}
	
	void Start () {
		nextLevelName = PlayerPrefs.GetString("LoadLevel");
		asyncOperation = Application.LoadLevelAsync(nextLevelName);
	}
	
	// Update is called once per frame
	void Update () {
		loadingSlider.sliderValue = (asyncOperation.progress);
		Debug.Log("asyncOperation.progress = " + asyncOperation.progress + " ,loadingSlider.sliderValue" + loadingSlider.sliderValue);	
	}
	
}

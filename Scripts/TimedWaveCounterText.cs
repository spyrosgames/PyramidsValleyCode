using UnityEngine;
using System.Collections;

public class TimedWaveCounterText : MonoBehaviour {
	private UILabel counterTextLabel;
	
	void Awake()
	{
		counterTextLabel = GetComponent<UILabel>();	
	}
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void UpdateText(string text)
	{
		counterTextLabel.text = text;
	}
}

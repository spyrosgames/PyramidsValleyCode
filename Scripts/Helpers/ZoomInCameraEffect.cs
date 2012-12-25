using UnityEngine;
using System.Collections;

public class ZoomInCameraEffect : MonoBehaviour {
	public GameObject MainCamera;
	
	public void ZoomInCamera()
	{
		//Zoom the field of view in:
	
	    iTween.ValueTo(gameObject, iTween.Hash("from",58,"to",38,"time",2.5,"onupdate","animateFieldOfView","easetype","easeinoutcubic"));
	
	    
	    //Zoom the field of view out:
	    iTween.ValueTo(gameObject, iTween.Hash("from",38,"to",58,"time",2.5,"delay",2.4,"onupdate","animateFieldOfView","easetype","easeinoutcubic"));
	}
	
	private void animateFieldOfView(float newFieldOfView){
   		MainCamera.camera.fieldOfView = newFieldOfView;
	}
}

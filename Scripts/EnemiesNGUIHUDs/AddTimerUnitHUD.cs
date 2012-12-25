using UnityEngine;

/// <summary>
/// Example script that instantiates a HUD window that will follow this game object.
/// </summary>

[AddComponentMenu("NGUI/Examples/Add Unit HUD")]
public class AddTimerUnitHUD : MonoBehaviour
{
    public GameObject prefab;

    void OnEnable ()
    {
        if (prefab != null)
        {
            Debug.Log("Instantiating a timer");
			UICamera cam = UICamera.FindCameraForLayer(prefab.layer);

            if (cam != null)
            {
                GameObject go = cam.gameObject;
                UIPanel anchor = go.GetComponentInChildren<UIPanel>();
                if (anchor != null) go = anchor.gameObject;

                GameObject child = GameObject.Instantiate(prefab) as GameObject;
                Transform t = child.transform;
                t.parent = go.transform;
                t.localPosition = Vector3.zero;
                t.localRotation = Quaternion.identity;
                t.localScale = Vector3.one;
                TimerHUD hud = child.GetComponent<TimerHUD>();
                if (hud != null) hud.target = transform;
            }
            else
            {
                Debug.LogWarning("No camera found for layer " + LayerMask.LayerToName(prefab.layer), gameObject);
            }
        }
        //Destroy(this);
    }
}
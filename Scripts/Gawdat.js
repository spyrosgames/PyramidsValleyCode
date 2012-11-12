#pragma strict
import System.Collections.Generic;

private var windowRect : Rect = Rect(Screen.width * 0.5, Screen.height * 0.05, Screen.width * 0.2, Screen.height * 0.75);
static var texture : Texture2D;
private var emptyTexture : Texture2D;
private var textureToAdd : Texture2D[] = new Texture2D[5];
public var slotImageToAdd : Texture2D[] = new Texture2D[5];
private var textureListSize = 5;
private var equippedMagicsList : List.<String> = new List.<String>();
private var slotCanBeTapped : String[] = new String[5];

public var magicsIcons : Texture2D[] = new Texture2D[5];
private var horizRatio = (Screen.width + 0.0) / 800;
private var vertRatio = (Screen.height + 0.0) / 480;

public var levelName : String;

function Awake()
{
    
    PlayerPrefs.DeleteAll();
    /*
    for(var i : int = 0; i < textureListSize; i++)
    {
        slotCanBeTapped[i] = "false";
    }
    */
}

function Start () {

}

function Update () {

}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0, 0, 0), Quaternion.identity, Vector3 (horizRatio, vertRatio, 1));
    createEmptyInventorySlots();
}

function createEmptyInventorySlots()
{
	GUI.BeginGroup(windowRect);
	windowRect = GUI.Window(0, windowRect, DragInventory, "Gestures");
    if(GUI.Button(Rect(10, 50 * 5 + 40, 100, 50), "Play"))
    {
        PlayerPrefs.SetString("Magic0", "HolyFire");
        PlayerPrefs.SetString("Magic1", "Crowstorm");
        PlayerPrefs.SetString("Magic2", "Tornado");
        PlayerPrefs.SetString("Magic3", "Starfall");
        PlayerPrefs.SetString("Magic4", "LightningStrike");

        Application.LoadLevel(levelName);
    }
	GUI.EndGroup();
}

function DragInventory(windowID : int)
{
	for(var x = 0; x < textureListSize; x++)
    {

        //for(var y = 0; y < textureListSize; y++)
        //{       

            var rect = Rect(10, 50 * x + 20, 50, 50);
            var slot = GUI.Button(rect, textureToAdd[x]);

            GUI.Label( Rect(70, 50 * x + 20, 50, 50), slotImageToAdd[x]);

            textureToAdd[x] = magicsIcons[x];

        //}

    }
}
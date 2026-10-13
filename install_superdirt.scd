// Install SuperDirt and Dirt-Samples for Tidal. Run: sclang install_superdirt.scd
Quarks.checkForUpdates({
	"Installing SuperDirt...".postln;
	Quarks.install("SuperDirt", "v1.1.3");
	"Installing Dirt-Samples...".postln;
	Quarks.install("Dirt-Samples");
	"Recompiling class library...".postln;
	thisProcess.recompile();
	"Done. Restart SuperCollider and run: SuperDirt.start".postln;
	0.exit;
});

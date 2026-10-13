// Start SuperDirt and keep running. Run: sclang start_superdirt.scd  OR  ./start-sound.sh
SuperDirt.start;
"SuperDirt started. Listening for Tidal on port 57120.".postln;
Routine.run({ inf.do { 1.wait } }); // keep process alive

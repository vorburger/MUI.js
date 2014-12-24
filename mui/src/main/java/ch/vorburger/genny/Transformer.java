package ch.vorburger.genny;

public interface Transformer<InputT, OutputT> {

	OutputT map(InputT in);
	
}

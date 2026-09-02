import { Service } from '@angular/core';

@Service() // singleton by default
export class LoadingIndicatorService {
	showPopup: () => void = () => null;   // to show Round Loading Indicator
	hidePopup: () => void = () => null;
}

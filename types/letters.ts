export interface PendingLetter {
	_id: string;
	refNo: string;
	letterType: string;
	fromCompany: string;
	toCompanyName: string;
	clientName: string;
	currency: string;
	authorizedSignatory2: string;
	authorizedSignatory2Position: string;
	authorizedSignatory1: string;
	authorizedSignatory1Position: string;
	guaranteeAmount: number;
	crtBy: string;
	status: number;
	dateIssued: string;
	bidExpiredMonth: string;
	bidExpiredDay: string;
	bidExpiredYear: string;
	bidAmount: number;
	bidDate: string;
	bidNumber: string;
	FormData: string;
	numberOfDays: number;
	address: string;
	contractPurpose: string;
}

export interface LetterData {
	refNo: string;
	date: string;
	toName: string;
	address: string;
	clientName: string;
	bondAmount: number;
	currency: string;
	validityMonth: string;
	validityDate: string;
	validityYear: string;
	fromDate: string;
	numberOfDays: number;
	contractPurpose: string;
	bidNo: string;
	bidDate: string;
	bankName: string;
	authorizedSignatory: string;
	authorizedSignatoryPosition: string;
	authorizedSignatory1: string;
	authorizedSignatoryPosition1: string;
	qrCodeUrl?: string;
}
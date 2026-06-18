function getAverage(gradeArray) {
	let totalScore = 0;
	const gradeCount = gradeArray.length;

	for (let i = 0; i < gradeCount; i++) {
		totalScore += gradeArray[i];
	}

	const averageScore = totalScore/gradeCount;
	return averageScore;
}

function getGrade(studentScore) {
	if (studentScore >= 100) {
		return "A+";
	} else if (studentScore < 100 && studentScore >= 90) {
		return "A";
	} else if (studentScore < 90 && studentScore >= 80) {
		return "B";
	} else if (studentScore < 80 && studentScore >= 70) {
		return "C";
	} else if (studentScore < 70 && studentScore >= 60) {
		return "D";
	} else {
		return "F";
	}
}

function hasPassingGrade(score) {
	const studentGrade = getGrade(score);
	
	if (studentGrade === "F") {
		return false;
	} else {
		return true;
	}
}

function studentMsg(scores, studentScore) {
	const classAverage = getAverage(scores);
	const studentGrade = getGrade(studentScore)
	console.log(studentGrade);
	const hasPassed = hasPassingGrade(studentScore);
	console.log(hasPassed);

	if (hasPassed) {
		return `Class average: ${classAverage}. Your grade: ${studentGrade}. You passed the course.`
	} else {
		return `Class average: ${classAverage}. Your grade: ${studentGrade}. You failed the course.`
	}
}


console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100));
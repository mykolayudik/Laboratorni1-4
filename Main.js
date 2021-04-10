function boruvka (inputArr) {
    document.getElementById("result_text").innerHTML += "\n\n                 Алгоритм Борувки                  ";
    let min = []
    for (let i = 0; i < inputArr.length; i++) {
        let tempArr = [...inputArr[i]];
        min.push([i, tempArr.indexOf(Math.min.apply(null, inputArr[i].filter(Boolean)))]);
    }
    document.getElementById("result_text").innerHTML += "\n1. Ребро мінімального ваги, що падає на кожну вершину графіка: ";
    for (let i = 0; i < min.length; i++) {
        document.getElementById("result_text").innerHTML += "\n["+min[i]+"] ";
    }

    let minC = [...min];
    let components = [];

    while (minC.length > 0){
    let component = [minC[0][0], minC[0][1]];
    let t = 1;
        while (t != 0){
            t = 0
            for (let i = 0; i < minC.length; i++) {
                for (let j = 0; j < component.length; j++) {
                    if(minC[i][0] == component[j] && component.indexOf(minC[i][1]) == -1){
                        component.push(minC[i][1]);
                        t++;
                    }
                    if(minC[i][1] == component[j] && component.indexOf(minC[i][0]) == -1){
                        component.push(minC[i][0]);
                        t++;
                    }
                }
            }
        }

    components.push(component);

    let tempArr = [];
    for (let i = 0; i < min.length; i++) {
        let t = 0;
        for (let j = 0; j < components.length; j++) {
            if(components[j].indexOf(i) !== -1) t++;
        }
        if(t == 0) tempArr.push(min[i]);
    }

    minC = [...tempArr];
    console.log(component);
    console.log(minC);
    }


    document.getElementById("result_text").innerHTML += "\n\nЗалишилися компоненти: \n";
    for (let i = 0; i < components.length; i++) {
        document.getElementById("result_text").innerHTML += "["+components[i]+"] ";
    }

    let connections = [];

    for (let i = 0; i < components.length - 1; i++) {
        connections.push(cartesian(components[i], components[i + 1]));
    }
    connections.push(cartesian(components[0], components[components.length - 1]));
    
    console.log(connections);
    document.getElementById("result_text").innerHTML += "\n\n2. Пошук найкоротших зв’язків між компонентами: \n";
    document.getElementById("result_text").innerHTML += "\nВсі доступні з'єднання: ";
    for (let i = 0; i < connections.length; i++) {
        document.getElementById("result_text").innerHTML += "\n[";
        for (let j = 0; j < connections[i].length; j++) {
            document.getElementById("result_text").innerHTML += "["+connections[i][j]+"] ";
        }
        document.getElementById("result_text").innerHTML += "]";
    }

    function cartesian(...args) {
        var r = [], max = args.length-1;
        function helper(arr, i) {
            for (var j=0, l=args[i].length; j<l; j++) {
                var a = arr.slice(0); // clone arr
                a.push(args[i][j]);
                if (i==max){
                    if(inputArr[a[0]][a[1]] != 0) r.push(a);
                }
                else
                    helper(a, i+1);
            }
        }
        helper([], 0);
        return r;
    }
    
    let connectionsWeight = [];

    for (let i = 0; i < connections.length; i++) {
        connectionsWeight.push([]);
        for (let j = 0; j < connections[i].length; j++) {
            connectionsWeight[i].push(inputArr[connections[i][j][0]][connections[i][j][1]]);
        }
    }

    console.log(connectionsWeight);
    
    let minMin = [];
    let minMinValue = [];
    for (let i = 0; i < connectionsWeight.length; i++) {
        minMin.push([Math.min(...connectionsWeight[i]), connections[i][connectionsWeight[i].indexOf(Math.min(...connectionsWeight[i]))]]);
        minMinValue.push(Math.min(...connectionsWeight[i]));
    }

    document.getElementById("result_text").innerHTML += "\nМінімальні зв’язки: ";
    for (let i = 0; i < minMin.length; i++) {
        document.getElementById("result_text").innerHTML += "\n[";
        for (let j = 0; j < minMin[i].length; j++) {
            document.getElementById("result_text").innerHTML += "["+minMin[i][j]+"] ";
        }
        document.getElementById("result_text").innerHTML += "]";
    }

    console.log(minMin);
    minMin.splice(minMinValue.indexOf(Math.max(...minMinValue)), 1);
    console.log(minMin);

    let addConnections = [];
    for (let i = 0; i < minMin.length; i++) {
        addConnections.push(minMin[i][1]);
    }

    console.log(addConnections);

    let result = [...min];
    for (let i = 0; i < addConnections.length; i++) {
        result.push(addConnections[i]);
    }

    document.getElementById("result_text").innerHTML += "\n\n3. Мінімальне охоплююче дерево: ";
    for (let i = 0; i < result.length; i++) {
        document.getElementById("result_text").innerHTML += "\n[";
        document.getElementById("result_text").innerHTML += result[i];
        document.getElementById("result_text").innerHTML += "]";
    }
}

function postman (arr) {

    document.getElementById("result_text").innerHTML += "\n\n               Проблема  листоноші          ";
    document.getElementById("result_text").innerHTML += "\n1. Перевірте, чи всі вузли парні";

    let edgeCount = [];
    for (let i = 0; i < arr.length; i++) {
        edgeCount.push(0);
        for (let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] != 0) edgeCount[i]++;
        }
    }
    console.log(edgeCount);

    let oddCount = 0;
    for (let i = 0; i < edgeCount.length; i++) {
        if(edgeCount[i] % 2 != 0) oddCount++;
    }

    if(oddCount > 2){
        document.getElementById("result_text").innerHTML += "\nЗнайдені непарні вузли";
        document.getElementById("result_text").innerHTML += "\nДублювання країв";

        let oddIndexes = [];
        for (let i = 0; i < edgeCount.length; i++) {
            if(edgeCount[i] % 2 != 0) oddIndexes.push(i);
        }
        console.log(oddIndexes);

        let duplicatePairs = [];

        while (oddIndexes.length > 1){
            let first = oddIndexes[0];
            let second;
            for (let i = 1; i < oddIndexes.length; i++) {
                if(arr[first][oddIndexes[i]] != 0 && !second) second = oddIndexes[i];
            }
            if(!second) {
                document.getElementById("result_text").innerHTML += "\nНеможливо дублювати краї";
                return 0;
            }
            else{
                console.log(second)
                oddIndexes.splice(oddIndexes.indexOf(first), 1);
                oddIndexes.splice(oddIndexes.indexOf(second), 1);
                console.log(oddIndexes);
                duplicatePairs.push([first, second]);
                document.getElementById("result_text").innerHTML += `\n[${first}-${second}]`;
            }
        }
        
        console.log(duplicatePairs);
        eulerianPath(arr, duplicatePairs);

    }else{
        eulerianPath(arr);
    }

    function eulerianPath(a, b = []) {
        document.getElementById("result_text").innerHTML += "\n\n2. Пошук Ейлерового циклу";
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                sum += a[i][j];
            }
        }
        sum /= 2;
        for (let i = 0; i < b.length; i++) {
            sum += a[b[i][0]][b[i][1]];
        }

        let stack1 = [0];
        let stack2 = [0];

        let edgeCount = 2;
        let limit = 0;
        while(edgeCount > 1 && limit < 25){
            limit++;

            let next = "O";
            for (let i = 0; i < a[stack1[stack1.length - 1]].length; i++) {
                if(a[stack1[stack1.length - 1]][i] != 0 && next == "O") next = i;
                //console.log(next);
            }
            
            document.getElementById("result_text").innerHTML += `\n\nPath: ${stack1}`;
            document.getElementById("result_text").innerHTML += `\nCycle: ${stack2}`;
            if(next == stack2[stack2.length - 1]){
                stack2.push(stack1[stack1.length - 1])


                let newB = []
                let del = 0;
                for (let i = 0; i < b.length; i++) {
                    if(!(b[i][0] == stack1[stack1.length - 2] && b[i][1] == stack1[stack1.length - 1]) && !(b[i][0] == stack1[stack1.length - 1] && b[i][1] == stack1[stack1.length - 2])) newB.push(b[i]);
                    else {
                        del++;
                    }
                }
                b = [...newB];
                if(del == 0){
                    a[stack1[stack1.length - 1]][next] = 0;
                    a[next][stack1[stack1.length - 1]] = 0;
                }

            }
            else{
                stack1.push(next);
                console.log(stack1[stack1.length - 1]+ " : " +stack1[stack1.length - 2]);

                let newB = []
                let del = 0;
                for (let i = 0; i < b.length; i++) {
                    if(!(b[i][0] == stack1[stack1.length - 2] && b[i][1] == stack1[stack1.length - 1]) && !(b[i][0] == stack1[stack1.length - 1] && b[i][1] == stack1[stack1.length - 2])) newB.push(b[i]);
                    else {
                        del++;
                    }
                }
                b = [...newB];
                if(del == 0){
                    a[stack1[stack1.length - 1]][stack1[stack1.length - 2]] = 0;
                    a[stack1[stack1.length - 2]][stack1[stack1.length - 1]] = 0;
                }
            }


            edgeCount = 0;
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < a[i].length; j++) {
                    if(a[i][j] != 0) edgeCount++;
                }
            }
            edgeCount /= 2;
            edgeCount += b.length;
            console.log(edgeCount);
        }

        console.log(stack1);
        console.log(stack2);

        let result = [...stack2];

        for (let i = stack1.length - 1; i >= 0; i--) {
            result.push(stack1[i]);
        }

        document.getElementById("result_text").innerHTML += "\n\n";
        for (let i = 0; i < result.length; i++) {
            document.getElementById("result_text").innerHTML += `${result[i]}`;
            if(i < result.length - 1) document.getElementById("result_text").innerHTML += "->";
        }

        document.getElementById("result_text").innerHTML += `\n\n Sum: ${sum}`;

        console.log(result);
        console.log(sum);

    }
}

function commisVoyageur (arr){
    console.log(arr);

    document.getElementById("result_text").innerHTML += "\n\n               Проблема комівояжера         \n";

    let arrCopy = arr.map(function(arr1) {
        return arr1.slice();
    });

    arr = minColRowDel(arr)[0];
    let minRow = minColRowDel(arr)[1];
    let minCol = minColRowDel(arr)[2];
    console.log(arr);

    let minLim = minRow.reduce((a, b) => a + b, 0) + minCol.reduce((a, b) => a + b, 0);
    console.log (`minLim: ${minLim}`);

    for (let i = 0; i < arr.length; i++) {
        document.getElementById("result_text").innerHTML += "\n["+arr[i]+"]";
    }

    let limit = 0;
    let banList = [];
    let result = `Path: `;

    while(limit < 20 && banList.length < arr.length * 2){
        limit++;

        document.getElementById("result_text").innerHTML += `\n\n-------------------- Ітерація #${limit} ------------------`;

        let maxZeroMatrix = maxZeroMatrixCount(arr);
        console.log(maxZeroMatrix);
        let maxZero = {
            value: 0,
            position: [0,0]
        }
        for (let i = 0; i < maxZeroMatrix.length; i++) {
            for (let j = 0; j < maxZeroMatrix[0].length; j++) {
                if(maxZeroMatrix[i][j] > maxZero.value){
                    maxZero.value = maxZeroMatrix[i][j];
                    maxZero.position = [i, j];
                }
            }
        }
        console.log(maxZero);
        document.getElementById("result_text").innerHTML += `\n\nКонтрольний край (${maxZero.position[0]}; ${maxZero.position[1]}) = ${maxZero.value}\n`;
    
        for (let i = 0; i < arr.length; i++) {
            document.getElementById("result_text").innerHTML += "\n["+arr[i]+"]";
        }

        includeResult = include(arr, maxZero.position, banList);
        console.log(includeResult);
        notIncludeResult = notInclude(arr, maxZero.position);
        console.log(notIncludeResult);

        if(includeResult.minLim < notIncludeResult.minLim){
            console.log(`\n\nВ тому числі (${maxZero.position})\n\n`);
            document.getElementById("result_text").innerHTML += `\n\nВ тому числі (${maxZero.position})`;
            arr = includeResult.matrix;
            banList.push(maxZero.position[0], maxZero.position[1]);
        }else{
            console.log(`\n\nНе враховуючи (${maxZero.position})\n\n`);
            document.getElementById("result_text").innerHTML += `\n\nНе враховуючи (${maxZero.position})`;
            arr = notIncludeResult.matrix;
        }

        console.log("BanList:" + banList);

        tempResult = "Список країв: ";
        for (let i = 0; i < banList.length-1; i+=2) {
            tempResult += `(${banList[i]},${banList[i+1]})`;
            if(i != banList.length-2) tempResult += ` => `;
        }
        document.getElementById("result_text").innerHTML += `\n${tempResult}`;
    }

    for (let i = 0; i < banList.length-1; i+=2) {
        const element = banList[i];
        result += `(${banList[i]}, ${banList[i+1]}) => `;
    }

    console.log(result);

    let sum = 0;

    for (let i = 0; i < arrCopy.length; i++) {
        for (let j = 0; j < arrCopy[i].length; j++) {
            for (let k = 0; k < banList.length-1; k+=2) {
                if(i == banList[k] && j == banList[k+1]) sum += arrCopy[i][j];
            }
        }
    }


    console.log("SUM: " + sum);
    document.getElementById("result_text").innerHTML += `\n\n----------------------------------------------------`;
    document.getElementById("result_text").innerHTML += `\n\nSum: ${sum}`;

    let resultCycle = cycleBuilder(banList);
    console.log(resultCycle);

    document.getElementById("result_text").innerHTML += `\n\n${resultCycle}`;

    function minColRowDel (arr){

        let tempArr = arr.map(function(arr) {
            return arr.slice();
        });

        let minRow = [];
        let minCol = [];
    
        for (let i = 0; i < tempArr.length; i++) {
            minRow.push(Infinity);
            for (let j = 0; j < tempArr[i].length; j++) {
                if(tempArr[i][j] < minRow[i]) minRow[i] = tempArr[i][j];
            }
        }
    
        console.log(`minRow: ${minRow}`);
        
    
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].length; j++) {
                tempArr[i][j] -= minRow[i];
            }
        }
    
        console.log(tempArr);
    
        for (let i = 0; i < tempArr.length; i++) {
            minCol.push(Infinity);
            for (let j = 0; j < tempArr[i].length; j++) {
                if(tempArr[j][i] < minCol[i]) minCol[i] = tempArr[j][i];
            }
        }
    
        console.log(`minCol: ${minCol}`);
        
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].length; j++) {
                tempArr[j][i] -= minCol[i];
            }
        }

        return [tempArr, minRow, minCol];
    }

    function maxZeroMatrixCount(arr){
        let result = [];
        document.getElementById("result_text").innerHTML += `\n`;
        for (let i = 0; i < arr.length; i++) {
            result.push([]);
            for (let j = 0; j < arr[i].length; j++) {
                if(arr[i][j] == 0){
                    let tempArr = arr.map(function(arr) {
                        return arr.slice();
                    });
                    tempArr[i][j] = Infinity;
                    let minRow = Infinity;
                    for (let k = 0; k < tempArr.length; k++) {
                        if(tempArr[i][k] < minRow) minRow = tempArr[i][k];
                    }

                    let minCol = Infinity;
                    for (let k = 0; k < tempArr.length; k++) {
                        if(tempArr[k][j] < minCol) minCol = tempArr[k][j];
                    }
                    result[i].push(minRow + minCol);
                    console.log(`O(${i};${j}) = ${minRow} + ${minCol} = ${minRow + minCol}`);
                    document.getElementById("result_text").innerHTML += `\nO(${i};${j}) = ${minRow} + ${minCol} = ${minRow + minCol}`;
                }
                else result[i].push(0);
            }
        }
        return result;
    }

    function notInclude(inputArr, position){
        let tempArr = inputArr.map(function(arr) {
            return arr.slice();
        });
        tempArr[position[0]][position[1]] = Infinity;


        console.log("SENDING THIS TO NOT include minColRowDel:");
        console.log(tempArr);


        let exportArr = minColRowDel(tempArr)[0];
        let minRow = minColRowDel(tempArr)[1];
        let minCol = minColRowDel(tempArr)[2];

        minRow.forEach(function(item, i) { if (item == Infinity) minRow[i] = 0; });
        minCol.forEach(function(item, i) { if (item == Infinity) minCol[i] = 0; });

        let minLim = minRow.reduce((a, b) => a + b, 0) + minCol.reduce((a, b) => a + b, 0);
        return {matrix:exportArr, minLim:minLim};
    }

    function include(inputArr, position, banList){
        let tempArr = inputArr.map(function(arr) {
            return arr.slice();
        });
        tempArr[position[1]][position[0]] = Infinity;

        for (let i = 0; i < banList.length-1; i+=2) {
            if(banList[i] == position[0]){
                tempArr[banList[i+1]][position[1]] = Infinity;
                tempArr[position[1]][banList[i+1]] = Infinity;
            }
            if(banList[i + 1] == position[0]){
                tempArr[banList[i]][position[1]] = Infinity;
                tempArr[position[1]][banList[i]] = Infinity;
            }
            if(banList[i] == position[1]){
                tempArr[banList[i+1]][position[0]] = Infinity;
                tempArr[position[0]][banList[i+1]] = Infinity;
            }
            if(banList[i+1] == position[1]){
                tempArr[banList[i]][position[0]] = Infinity;
                tempArr[position[0]][banList[i]] = Infinity;
            }
        }

        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].length; j++) {
                if(i == position[0] || j == position[1]) tempArr[i][j] = Infinity;
            }
        }

        console.log("SENDING THIS TO INCLUDE minColRowDel:");
        console.log(tempArr);

        let exportArr = minColRowDel(tempArr)[0];
        let minRow = minColRowDel(tempArr)[1];
        let minCol = minColRowDel(tempArr)[2];

        minRow.forEach(function(item, i) { if (item == Infinity) minRow[i] = 0; });
        minCol.forEach(function(item, i) { if (item == Infinity) minCol[i] = 0; });

        let minLim = minRow.reduce((a, b) => a + b, 0) + minCol.reduce((a, b) => a + b, 0);

        if(minRow.every( (val, i, arr) => val === arr[0] ) && minCol.every( (val, i, arr) => val === arr[0] )) minLim--;

        return {matrix:exportArr, minLim:minLim};
    }

    function cycleBuilder (a) {
        let result = "Cycle: ";
        let resultArr = [a[0], a[1]];

        for (let i = 0; i < a.length/2 - 1; i++) {
            if(findNext(a, resultArr[resultArr.length - 1]) != Infinity) resultArr.push(findNext(a, resultArr[resultArr.length - 1]));
            else return "Cycle not found";
        }
        
        function findNext(a, b){
            for (let i = 0; i < a.length - 1; i+=2) {
                if(a[i] == b) {
                    return a[i+1];
                }
            }
            return Infinity;
        }

        for (let i = 0; i < resultArr.length; i++) {
            result += `(${resultArr[i]})`;
            if(i != resultArr.length - 1) result += " => ";
        }

        return result;
    }
}



function graphFiller (arr){
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if(Math.max(...arr[i]) > max) max = Math.max(...arr[i]);
    }

    console.log(max);
    max++;

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push([]);
        for (let j = 0; j < arr[i].length; j++) {
            if(i == j) result[i].push(Infinity);
            else if(arr[i][j] == 0) result[i].push(max);
            else result[i].push(arr[i][j]);
        }
    }

    return result;
}

function  fordFulkerson (iArr) {
    let arr = iArr.map(function(arr1) {
        return arr1.slice();
    });

    document.getElementById("result_text").innerHTML += "\n\n               Алгоритм Форда – Фулькерсона         \n";

    let maxFlow = [];
    let paths = [];
    let limit = 0;
    while(pathFinder(arr) && limit < 25){
        limit++;
        
        document.getElementById("result_text").innerHTML += `\n\n-------------------- Ітерація #${limit} ------------------`;

        document.getElementById("result_text").innerHTML += `\n\nПошук шляхів від 0 to ${arr.length - 1}`;

        let path = pathFinder(arr);
        console.log(path);

        let minEdge = {
            coordinates: [],
            value: Infinity,
            i: 0
        }

        for (let i = 0; i < path.length; i++) {
            if(arr[path[i][0]][path[i][1]] < minEdge.value){
                minEdge.coordinates = [path[i][0], path[i][1]];
                minEdge.value = arr[path[i][0]][path[i][1]];
                minEdge.i = i;
            }
        }

        console.log(minEdge);

        for (let i = 0; i < path.length; i++) {
            if(i == minEdge.i) arr[path[i][0]][path[i][1]] = 0;
            else arr[path[i][0]][path[i][1]] -= minEdge.value;
        }

        
        maxFlow.push(minEdge.value);
        paths.push(path);

        document.getElementById("result_text").innerHTML += `\n\nЗнайдено шлях: `;
        for (let i = 0; i < path.length; i++) {
            if(i == path.length - 1) document.getElementById("result_text").innerHTML += `(${path[i][0]})=>(${path[i][1]})`;
            else document.getElementById("result_text").innerHTML += `(${path[i][0]})=>`;
        }
        document.getElementById("result_text").innerHTML += `\nШлях мінімального краю: (${minEdge.coordinates[0]},${minEdge.coordinates[1]}) = ${minEdge.value}`;
        document.getElementById("result_text").innerHTML += `\n\nНова матриця: \n${printMatrix(arr)}`;
    }

    document.getElementById("result_text").innerHTML += `\n\n----------------------------------------------------`;

    document.getElementById("result_text").innerHTML += `\n\nВсі шляхи:\n`;

    for (let i = 0; i < paths.length; i++) {
        for (let j = 0; j < paths[i].length; j++) {
            if(j == paths[i].length - 1) document.getElementById("result_text").innerHTML += `(${paths[i][j][0]})=>(${paths[i][j][1]})`;
            else document.getElementById("result_text").innerHTML += `(${paths[i][j][0]})=>`;
        }
        document.getElementById("result_text").innerHTML += `\nмінімальний край = ${maxFlow[i]}\n`;
    }

    document.getElementById("result_text").innerHTML += `\nМаксимальний потік:\n`;

    for (let i = 0; i < maxFlow.length; i++) {
        if(i == maxFlow.length - 1) document.getElementById("result_text").innerHTML += `${maxFlow[i]}`;
        else document.getElementById("result_text").innerHTML += `${maxFlow[i]} + `;
    }

    document.getElementById("result_text").innerHTML += ` = ${maxFlow.reduce((a, b) => a + b, 0)}`;

    console.log(...maxFlow);
    console.log(paths);


    function pathFinder (a){
        let path = [];
        let edgeList = [];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                if(a[i][j] != 0) edgeList.push({coordinates:[i,j], value:a[i][j]});
            }
        }

        if(edgeList.findIndex(val => val.coordinates[0] == 0) == -1) return 0;
        path.push(edgeList[edgeList.findIndex(val => val.coordinates[0] == 0)].coordinates);

        while(edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1]) != -1){
            console.log(`Found next: ${edgeList[edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1])].coordinates}`);
            path.push(edgeList[edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1])].coordinates);
            edgeList.splice(edgeList.findIndex(val => val.coordinates == path[path.length - 1]), 1);
            console.log("SPLICED");
            console.log(`New edgeList: \n`);
            console.log(edgeList);
            if(edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1]) == -1 && path[path.length - 1][1] != a.length - 1){
                path.splice(path.length - 1);
            }
        }

        if(path[path.length - 1][1] == a.length - 1) return path;
        else{
            console.log("Not a path");
            a[path[path.length - 1][0]][path[path.length - 1][1]] = 0
            return pathFinder(a);
        }
    }

}

function starter () {
    document.getElementById("result_text").innerHTML = "";
    let arr = reader();
    if(arr == "") document.getElementById("result_text").innerHTML += "ERROR: File not found";
    else {
        document.getElementById("result_text").innerHTML += "Input matrix:";

        for (let i = 0; i < arr.length; i++) {
            document.getElementById("result_text").innerHTML += "\n["+arr[i]+"]";
        }

        let radios = document.getElementsByName('lab');
        let lab = 0;
        for (let i = 0; i < radios.length; i++) {
            if(radios[i].checked) lab = i;
        }
        switch (lab) {
            case 0:
                boruvka(arr);
                break;
            case 1:
                postman(arr);
                break;
            case 2:
                commisVoyageur(graphFiller(arr));
                break;
            case 3:
                fordFulkerson(arr);
                break;
        }
    }
}

function reader() {
    let text = document.getElementById(`input_text`).value;
    let nArr = text.split(/\r?\n/);
    let n = parseFloat(nArr[0]);
    let arr = [];
    for (let i = 1; i < nArr.length; i++) {
        arr.push(nArr[i].replace(/ +$/, "").split(' ').map(Number));
    }
    return arr;
}

function printMatrix(a){
    let output = "";
    for (let i = 0; i < a.length; i++) {
        output += "["
        for (let j = 0; j < a[i].length; j++) {
            if(a[i][j] < 10) output += `${a[i][j]}   `;
            else if(a[i][j] < 100) output += `${a[i][j]}  `;
            else output += `${a[i][j]} `;
        }
        output += "]\n"
    }
    return output;
}
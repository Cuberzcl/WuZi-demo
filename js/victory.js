function victory(arr) {
    if (row_victory() || column_victory() || oblique1_victory() || oblique2_victory()) {
        return true;
    } else return false;


    function row_victory() {
        for (var i = 0; i < arr.length; ++i) {
            var temp = arr[i];
            if ((temp % 15) <= 11 && findElement(temp + 1) && findElement(temp + 2) && findElement(temp + 3) && findElement(temp + 4))
                return true;
        }

        return false;
    }

    function column_victory() {
        for (var i = 0; i < arr.length; ++i) {
            var temp = arr[i];
            if (temp <= 165 && findElement(temp + 15) && findElement(temp + 30) && findElement(temp + 45) && findElement(temp + 60))
                return true;
        }

        return false;
    }

    function oblique1_victory() {
        for (var i = 0; i < arr.length; ++i) {
            var temp = arr[i];
            if ((temp % 15) <= 11 && temp <= 165 && findElement(temp + 16) && findElement(temp + 32) && findElement(temp + 48) && findElement(temp + 64))
                return true;
        }

        return false;
    }

    function oblique2_victory() {
        for (var i = 0; i < arr.length; ++i) {
            var temp = arr[i];
            if ((temp % 15) >= 5 && temp <= 165 && findElement(temp + 14) && findElement(temp + 28) && findElement(temp + 42) && findElement(temp + 56))
                return true;
        }
    }

    function findElement(num) {
        if (arr.indexOf(num) == -1)
            return false;
        else return true;
    }
}
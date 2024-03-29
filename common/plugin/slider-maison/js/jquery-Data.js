/*!
 * jquery-Data v1.0
 * Author: Cavasoft
 */

(function ( $ ) {
 
    $.fn.Data = function( data_index, data_value, options ) {

        //Set Defaults options

        var $self = $(this);


        $self.init = function () {
            if(data_index){
                if(data_value){

                    return $self.Data_Set();

                }else{

                    return $self.Data_Get();

                }
            }else{
                console.log('The value can not be empty !');
                return undefined;
            }
        };

        $self.Data_Get = function () {

            var $self_Data = $self.attr('data-'+data_index);

            if(IsJsonString($self_Data)){

                $self_Data = JSON.parse($self_Data);

            }else if(Number.isInteger($self_Data)){

                $self_Data = parseInt($self_Data);

            }

            return $self_Data;
        };

        $self.Data_Set = function () {

            var $self_Data = data_value;

            if(IsJsonObject($self_Data)){
                $self_Data = JSON.stringify($self_Data);
            }

            $self.attr('data-'+data_index,$self_Data);

            return true;

        };

 
        return $self.init();




        function IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        function IsJsonObject(str) {
            if(str != null && typeof str == 'object'){
                return true;
            }else{
                return false;
            }
        }

    };
 
}( jQuery ));
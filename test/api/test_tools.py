# Test tools API.
from base import api
from operator import itemgetter
from .helpers import DatasetPopulator
from .helpers import DatasetCollectionPopulator
from .helpers import skip_without_tool


class ToolsTestCase( api.ApiTestCase ):

    def setUp( self ):
        super( ToolsTestCase, self ).setUp( )
        self.dataset_populator = DatasetPopulator( self.galaxy_interactor )
        self.dataset_collection_populator = DatasetCollectionPopulator( self.galaxy_interactor )

    def test_index( self ):
        tool_ids = self.__tool_ids()
        assert "upload1" in tool_ids

    def test_no_panel_index( self ):
        index = self._get( "tools", data=dict( in_panel="false" ) )
        tools_index = index.json()
        # No need to flatten out sections, with in_panel=False, only tools are
        # returned.
        tool_ids = map( itemgetter( "id" ), tools_index )
        assert "upload1" in tool_ids

    def test_upload1_paste( self ):
        history_id = self.dataset_populator.new_history()
        payload = self.dataset_populator.upload_payload( history_id, 'Hello World' )
        create_response = self._post( "tools", data=payload )
        self._assert_has_keys( create_response.json(), 'outputs' )

    def test_upload_posix_newline_fixes( self ):
        windows_content = "1\t2\t3\r4\t5\t6\r"
        posix_content = windows_content.replace("\r", "\n")
        result_content = self._upload_and_get_content( windows_content )
        self.assertEquals( result_content, posix_content )

    def test_upload_disable_posix_fix( self ):
        windows_content = "1\t2\t3\r4\t5\t6\r"
        result_content = self._upload_and_get_content( windows_content, to_posix_lines=None )
        self.assertEquals( result_content, windows_content )

    def test_upload_tab_to_space( self ):
        table = "1 2 3\n4 5 6\n"
        result_content = self._upload_and_get_content( table, space_to_tab="Yes" )
        self.assertEquals( result_content, "1\t2\t3\n4\t5\t6\n" )

    def test_upload_tab_to_space_off_by_default( self ):
        table = "1 2 3\n4 5 6\n"
        result_content = self._upload_and_get_content( table )
        self.assertEquals( result_content, table )

    @skip_without_tool( "cat1" )
    def test_run_cat1( self ):
        # Run simple non-upload tool with an input data parameter.
        history_id = self.dataset_populator.new_history()
        new_dataset = self.dataset_populator.new_dataset( history_id, content='Cat1Test' )
        inputs = dict(
            input1=dataset_to_param( new_dataset ),
        )
        outputs = self._cat1_outputs( history_id, inputs=inputs )
        self.assertEquals( len( outputs ), 1 )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        output1 = outputs[ 0 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        self.assertEqual( output1_content.strip(), "Cat1Test" )

    @skip_without_tool( "cat1" )
    def test_run_cat1_with_two_inputs( self ):
        # Run tool with an multiple data parameter and grouping (repeat)
        history_id = self.dataset_populator.new_history()
        new_dataset1 = self.dataset_populator.new_dataset( history_id, content='Cat1Test' )
        new_dataset2 = self.dataset_populator.new_dataset( history_id, content='Cat2Test' )
        inputs = {
            'input1': dataset_to_param( new_dataset1 ),
            'queries_0|input2': dataset_to_param( new_dataset2 )
        }
        outputs = self._cat1_outputs( history_id, inputs=inputs )
        self.assertEquals( len( outputs ), 1 )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        output1 = outputs[ 0 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        self.assertEqual( output1_content.strip(), "Cat1Test\nCat2Test" )

    @skip_without_tool( "cat1" )
    def test_multirun_cat1( self ):
        history_id = self.dataset_populator.new_history()
        new_dataset1 = self.dataset_populator.new_dataset( history_id, content='123' )
        new_dataset2 = self.dataset_populator.new_dataset( history_id, content='456' )
        inputs = {
            "input1|__multirun__": [
                dataset_to_param( new_dataset1 ),
                dataset_to_param( new_dataset2 ),
            ],
        }
        outputs = self._cat1_outputs( history_id, inputs=inputs )
        self.assertEquals( len( outputs ), 2 )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        output1 = outputs[ 0 ]
        output2 = outputs[ 1 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        output2_content = self._get_content( history_id, dataset=output2 )
        self.assertEquals( output1_content.strip(), "123" )
        self.assertEquals( output2_content.strip(), "456" )

    @skip_without_tool( "cat1" )
    def test_multirun_in_repeat( self ):
        history_id = self.dataset_populator.new_history()
        new_dataset1 = self.dataset_populator.new_dataset( history_id, content='123' )
        new_dataset2 = self.dataset_populator.new_dataset( history_id, content='456' )
        common_dataset = self.dataset_populator.new_dataset( history_id, content='Common' )
        inputs = {
            "input1": dataset_to_param( common_dataset ),
            'queries_0|input2|__multirun__': [
                dataset_to_param( new_dataset1 ),
                dataset_to_param( new_dataset2 ),
            ],
        }
        outputs = self._cat1_outputs( history_id, inputs=inputs )
        self.assertEquals( len( outputs ), 2 )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True, timeout=10 )
        output1 = outputs[ 0 ]
        output2 = outputs[ 1 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        output2_content = self._get_content( history_id, dataset=output2 )
        self.assertEquals( output1_content.strip(), "Common\n123" )
        self.assertEquals( output2_content.strip(), "Common\n456" )

    @skip_without_tool( "cat1" )
    def test_multirun_on_multiple_inputs( self ):
        history_id = self.dataset_populator.new_history()
        new_dataset1 = self.dataset_populator.new_dataset( history_id, content='123' )
        new_dataset2 = self.dataset_populator.new_dataset( history_id, content='456' )
        new_dataset3 = self.dataset_populator.new_dataset( history_id, content='789' )
        new_dataset4 = self.dataset_populator.new_dataset( history_id, content='0ab' )
        inputs = {
            "input1|__multirun__": [
                dataset_to_param( new_dataset1 ),
                dataset_to_param( new_dataset2 ),
            ],
            'queries_0|input2|__multirun__': [
                dataset_to_param( new_dataset3 ),
                dataset_to_param( new_dataset4 ),
            ],
        }
        outputs = self._cat1_outputs( history_id, inputs=inputs )
        self.assertEquals( len( outputs ), 4 )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        outputs_contents = [ self._get_content( history_id, dataset=o ).strip() for o in outputs ]
        assert "123\n789" in outputs_contents
        assert "456\n789" in outputs_contents
        assert "123\n0ab" in outputs_contents
        assert "456\n0ab" in outputs_contents

    @skip_without_tool( "cat1" )
    def test_map_over_collection( self ):
        history_id = self.dataset_populator.new_history()
        hdca_id = self.__build_pair( history_id, [ "123", "456" ] )
        inputs = {
            "input1|__collection_multirun__": hdca_id,
        }
        create = self._run_cat1( history_id, inputs=inputs, assert_ok=True )
        outputs = create[ 'outputs' ]
        jobs = create[ 'jobs' ]
        implicit_collections = create[ 'implicit_collections' ]
        self.assertEquals( len( jobs ), 2 )
        self.assertEquals( len( outputs ), 2 )
        self.assertEquals( len( implicit_collections ), 1 )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        output1 = outputs[ 0 ]
        output2 = outputs[ 1 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        output2_content = self._get_content( history_id, dataset=output2 )
        self.assertEquals( output1_content.strip(), "123" )
        self.assertEquals( output2_content.strip(), "456" )

    @skip_without_tool( "cat1" )
    def test_map_over_nested_collections( self ):
        history_id = self.dataset_populator.new_history()
        hdca_id = self.__build_nested_list( history_id )
        inputs = {
            "input1|__collection_multirun__": hdca_id,
        }
        create = self._run_cat1( history_id, inputs=inputs, assert_ok=True )
        outputs = create[ 'outputs' ]
        jobs = create[ 'jobs' ]
        implicit_collections = create[ 'implicit_collections' ]
        self.assertEquals( len( jobs ), 4 )
        self.assertEquals( len( outputs ), 4 )
        self.assertEquals( len( implicit_collections ), 1 )
        implicit_collection = implicit_collections[ 0 ]
        self._assert_has_keys( implicit_collection, "collection_type", "elements" )
        assert implicit_collection[ "collection_type" ] == "list:paired"
        assert len( implicit_collection[ "elements" ] ) == 2
        first_element, second_element = implicit_collection[ "elements" ]
        assert first_element[ "element_identifier" ] == "test0"
        assert second_element[ "element_identifier" ] == "test1"

        first_object = first_element[ "object" ]
        assert first_object[ "collection_type" ] == "paired"
        assert len( first_object[ "elements" ] ) == 2
        first_object_left_element = first_object[ "elements" ][ 0 ]
        self.assertEquals( outputs[ 0 ][ "id" ], first_object_left_element[ "object" ][ "id" ] )

    @skip_without_tool( "cat1" )
    def test_map_over_two_collections( self ):
        history_id = self.dataset_populator.new_history()
        hdca1_id = self.__build_pair( history_id, [ "123", "456" ] )
        hdca2_id = self.__build_pair( history_id, [ "789", "0ab" ] )
        inputs = {
            "input1|__collection_multirun__": hdca1_id,
            "queries_0|input2|__collection_multirun__": hdca2_id,
        }
        outputs = self._cat1_outputs( history_id, inputs=inputs )
        self.assertEquals( len( outputs ), 2 )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        output1 = outputs[ 0 ]
        output2 = outputs[ 1 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        output2_content = self._get_content( history_id, dataset=output2 )
        self.assertEquals( output1_content.strip(), "123\n789" )
        self.assertEquals( output2_content.strip(), "456\n0ab" )

    @skip_without_tool( "cat1" )
    def test_cannot_map_over_incompatible_collections( self ):
        history_id = self.dataset_populator.new_history()
        hdca1_id = self.__build_pair( history_id, [ "123", "456" ] )
        hdca2_id = self.dataset_collection_populator.create_list_in_history( history_id  ).json()[ "id" ]
        inputs = {
            "input1|__collection_multirun__": hdca1_id,
            "queries_0|input2|__collection_multirun__": hdca2_id,
        }
        run_response = self._run_cat1( history_id, inputs )
        # TODO: Fix this error checking once switch over to new API decorator
        # on server.
        assert run_response.status_code >= 400

    @skip_without_tool( "multi_data_param" )
    def test_reduce_collections( self ):
        history_id = self.dataset_populator.new_history()
        hdca1_id = self.__build_pair( history_id, [ "123", "456" ] )
        hdca2_id = self.dataset_collection_populator.create_list_in_history( history_id  ).json()[ "id" ]
        inputs = {
            "f1": "__collection_reduce__|%s" % hdca1_id,
            "f2": "__collection_reduce__|%s" % hdca2_id,
        }
        create = self._run( "multi_data_param", history_id, inputs, assert_ok=True )
        outputs = create[ 'outputs' ]
        jobs = create[ 'jobs' ]
        assert len( jobs ) == 1
        assert len( outputs ) == 2
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        output1 = outputs[ 0 ]
        output2 = outputs[ 1 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        output2_content = self._get_content( history_id, dataset=output2 )
        assert output1_content.strip() == "123\n456"
        assert len( output2_content.strip().split("\n") ) == 3, output2_content

    @skip_without_tool( "collection_paired_test" )
    def test_subcollection_mapping( self ):
        history_id = self.dataset_populator.new_history()
        hdca_list_id = self.__build_nested_list( history_id )
        inputs = {
            "f1|__subcollection_multirun__": "%s|paired" % hdca_list_id
        }
        # Following wait not really needed - just getting so many database
        # locked errors with sqlite.
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        outputs = self._run_and_get_outputs( "collection_paired_test", history_id, inputs )
        assert len( outputs ), 2
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        output1 = outputs[ 0 ]
        output2 = outputs[ 1 ]
        output1_content = self._get_content( history_id, dataset=output1 )
        output2_content = self._get_content( history_id, dataset=output2 )
        assert output1_content.strip() == "123\n456", output1_content
        assert output2_content.strip() == "789\n0ab", output2_content

    def _cat1_outputs( self, history_id, inputs ):
        return self._run_outputs( self._run_cat1( history_id, inputs ) )

    def _run_and_get_outputs( self, tool_id, history_id, inputs ):
        return self._run_outputs( self._run( tool_id, history_id, inputs ) )

    def _run_outputs( self, create_response ):
        self._assert_status_code_is( create_response, 200 )
        return create_response.json()[ 'outputs' ]

    def _run_cat1( self, history_id, inputs, assert_ok=False ):
        return self._run( 'cat1', history_id, inputs, assert_ok=assert_ok )

    def _run( self, tool_id, history_id, inputs, assert_ok=False ):
        payload = self.dataset_populator.run_tool_payload(
            tool_id=tool_id,
            inputs=inputs,
            history_id=history_id,
        )
        create_response = self._post( "tools", data=payload )
        if assert_ok:
            self._assert_status_code_is( create_response, 200 )
            create = create_response.json()
            self._assert_has_keys( create, 'outputs' )
            return create
        else:
            return create_response

    def _upload_and_get_content( self, content, **upload_kwds ):
        history_id = self.dataset_populator.new_history()
        new_dataset = self.dataset_populator.new_dataset( history_id, content=content, **upload_kwds )
        self.dataset_populator.wait_for_history( history_id, assert_ok=True )
        return self._get_content( history_id, dataset=new_dataset )

    def _get_content( self, history_id, **kwds ):
        if "dataset_id" in kwds:
            dataset_id = kwds[ "dataset_id" ]
        else:
            dataset_id = kwds[ "dataset" ][ "id" ]
        display_response = self._get( "histories/%s/contents/%s/display" % ( history_id, dataset_id ) )
        self._assert_status_code_is( display_response, 200 )
        return display_response.content

    def __tool_ids( self ):
        index = self._get( "tools" )
        tools_index = index.json()
        # In panels by default, so flatten out sections...
        tools = []
        for tool_or_section in tools_index:
            if "elems" in tool_or_section:
                tools.extend( tool_or_section[ "elems" ] )
            else:
                tools.append( tool_or_section )

        tool_ids = map( itemgetter( "id" ), tools )
        return tool_ids

    def __build_nested_list( self, history_id ):
        hdca1_id = self.__build_pair( history_id, [ "123", "456" ] )
        hdca2_id = self.__build_pair( history_id, [ "789", "0ab" ] )

        response = self.dataset_collection_populator.create_list_from_pairs( history_id, [ hdca1_id, hdca2_id ] )
        self._assert_status_code_is( response, 200 )
        hdca_list_id = response.json()[ "id" ]
        return hdca_list_id

    def __build_pair( self, history_id, contents ):
        create_response = self.dataset_collection_populator.create_pair_in_history( history_id, contents=contents )
        hdca_id = create_response.json()[ "id" ]
        return hdca_id


def dataset_to_param( dataset ):
    return dict(
        src='hda',
        id=dataset[ 'id' ]
    )

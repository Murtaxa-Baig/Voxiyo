import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls'; // Make sure this import is correct

export default function TermsAndConditions({navigation}) {
  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <SvgXml xml={Xmls.crossIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Terms and Conditions</Text>
      </View>

      {/* Scrollable content with no scroll indicator */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Arcu facilisi aenean quis viverra. Sed volutpat augue nulla eget diam
          at. Dolor turpis in quam cursus magna fringilla condimentum. Eu at
          aliquam curabitur etiam eget. Sed tincidunt at dictum amet id.
        </Text>
        <Text style={styles.text}>
          Cras sed mattis quam sapien sit ipsum non placerat in. Risus donec
          congue sed consectetur non arcu laoreet. Elementum molestie in
          pulvinar rhoncus sagittis pharetra euismod integer. Purus pellentesque
          amet sit sagittis dolor. Pellentesque justo fusce id id. Curabitur
          tellus vitae massa viverra neque cursus. Cursus tincidunt ut eget enim
          et arcu pharetra molestie. Blandit vel vitae suspendisse eget.
          Adipiscing volutpat euismod at massa. Semper consequat nullam
          condimentum nisl et quam at dictum dictum. Lorem elit purus nam augue
          ipsum facilisis. Molestie tempor venenatis at augue sit euismod
          egestas.
        </Text>
        <Text style={styles.text}>
          Blandit phasellus at velit accumsan ac sed. Diam ultricies dictum odio
          pulvinar semper ipsum et. Ultricies suspendisse maecenas mi tellus
          auctor imperdiet augue in tellus. Tristique duis egestas pulvinar
          libero leo arcu leo. Tincidunt accumsan cursus venenatis mi sit
          pretium egestas. Est ligula faucibus placerat velit augue tellus
          ullamcorper dui id. Eget risus eu magnis tellus condimentum leo
          consequat sed. Nisl at commodo vitae pharetra ultricies suspendisse.
          Pharetra egestas lectus aliquet morbi egestas diam senectus.
        </Text>
        <Text style={styles.text}>
          Nunc id lorem semper quis. Velit amet augue ut pretium porttitor
          neque. A mattis elit aliquam sed ac massa. Vestibulum fames donec
          lorem urna lectus. Consequat enim faucibus ultrices aliquet mauris
          pulvinar. Enim pulvinar sit ipsum gravida tortor. Vitae integer velit
          aliquet pharetra vestibulum rutrum. Id augue ullamcorper hendrerit
          vestibulum turpis aliquet neque. Ipsum convallis nunc velit ipsum
          viverra. Blandit risus eu adipiscing sed egestas sit. Morbi sit
          sagittis tristique turpis elementum metus sagittis et neque. Elit
          pellentesque purus egestas maecenas lectus enim in. Ut leo facilisi
          etiam velit. Vitae enim consectetur sed eleifend magna sed. Posuere
          eget morbi elementum laoreet. Lacus in et urna est facilisis at nibh.
          Commodo sed ut quisque egestas. Massa velit sagittis eu neque eget
          mattis vulputate. Semper lacinia id in integer sed dui odio.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backArrow: {
    width: '20%',
  },
  heading: {
    fontSize: 16,
    color: '#0D0F10',
    width: '80%',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  text: {
    color: '#7C7F83',
    marginTop: 24,
    lineHeight: 22,
    fontSize: 14,
  },
});
